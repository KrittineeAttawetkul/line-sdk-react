import React, { useCallback, useEffect, useRef, useState } from 'react'
import './rewardHistory.css'
import RewardHistoryCard from '../../../components/RewardHistoryCard/RewardHistoryCard'
import useLineLogin from '../../../utils/addons/useLineLogin';
import Liff_Id from '../../../assets/Liff_Id';
import { USER_ACTION } from '../../../apis/userApi';

const RewardHistory = () => {
    const [rewards, setRewards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const itemPerPage = 4; // Set a constant value for items per page
    const isInitialMount = useRef(true); // Track the first mount

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        useLineLogin(Liff_Id.rewardHistory);
    }

    const loadMorePosts = useCallback(async () => {
        if (loading || !hasMore) return; // Prevent fetching if already loading or no more items

        setLoading(true);
        const updatedPayload = {
            user_id: JSON.parse(localStorage.getItem('lineProfile')).user_id,
            pageNo: page,
            itemPerPage: itemPerPage
        };

        try {
            const newPosts = await USER_ACTION.getRewardHistoryByUserId(updatedPayload);
            console.log('Fetched posts:', newPosts.data); // Log fetched data

            if (newPosts.data.length === 0) {
                setHasMore(false); // No more posts
            } else {
                setRewards((prevRewards) => [...prevRewards, ...newPosts.data]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false); // Ensure loading state resets
        }
    }, [page, loading, hasMore]);

    const handleScroll = useCallback(() => {
        if (loading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            console.log('Loading more posts...');
            setPage((prevPage) => prevPage + 1); // Load more posts when scrolling near the bottom
        }
    }, [loading, hasMore]);

    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false; // Skip the first render
    //     } else if (hasMore) {
    //         loadMorePosts(); // Load posts on subsequent renders
    //     }
    // }, [page]); // Run effect whenever the page changes

    useEffect(() => {
        loadMorePosts();
    }, [page]); // Load more posts whenever the page changes

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    }, [handleScroll]); // Use handleScroll in dependency array

    return (
        <>
            <div className='rewardHistoryContainer'>
                <div className='rewardHistoryBox'>
                    <div className='rewardHistoryTitle'>
                        ประวัติการแลกของ
                    </div>
                    <div className='rewardHistoryRewardBox'>
                        <ul>
                            {
                                rewards.map((reward, i) => (
                                    <li key={`${reward.reward_id}-${i}`}>
                                        <div>
                                            <RewardHistoryCard Reward={reward} />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='loading'>
                            {loading ? <div>Loading...</div> : rewards.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RewardHistory