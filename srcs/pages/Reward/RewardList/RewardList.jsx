import React, { useEffect, useState, useRef, useCallback } from 'react';
import { USER_ACTION } from '../../../apis/userApi'; // Adjust the path as needed
import RewardCard from '../../../components/RewardCard/RewardCard';
import RewardListHeader from './rewardListTab/RewardListHeader';
import liff from '@line/liff';
import './rewardList.css';
import Liff_Id from '../../../assets/Liff_Id';

const RewardList = () => {
    const [rewards, setRewards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const itemPerPage = 8; // Set a constant value for items per page
    const isInitialMount = useRef(true); // Track the first mount

    // Initialize LIFF
    useEffect(() => {
        liff.init({ liffId: Liff_Id.rewardlist }) // Replace with your actual LIFF ID
            .then(() => {
                console.log('LIFF initialized');
            })
            .catch((err) => {
                console.error('LIFF initialization failed:', err);
            });
    }, []);

    const loadMorePosts = useCallback(async () => {
        if (loading || !hasMore) return; // Prevent fetching if already loading or no more items

        setLoading(true);
        const updatedPayload = {
            pageNo: page,
            itemPerPage: itemPerPage
        };

        try {
            const newPosts = await USER_ACTION.allReward(updatedPayload);
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
        <div className='rewardListContainer'>
            <div className='rewardListBox'>
                <div className='rewardListHeader'>
                    <RewardListHeader />
                </div>
                <div className='rewardListRewardBox'>
                    <ul>
                        {
                            rewards.map((reward, i) => (
                                <li key={`${reward.reward_id}-${i}`}>
                                    <button
                                        onClick={() => {
                                            const rewardUrl = `https://liff.line.me/2006140913-67Argbab?reward_id=${reward.reward_id}`;
                                            console.log('Navigating to:', rewardUrl);
                                            window.location.href = rewardUrl;

                                            // location.replace(rewardUrl)

                                            // // Check if inside LINE app, use LIFF to open
                                            // if (liff.isInClient()) {
                                            //     liff.openWindow({
                                            //         url: rewardUrl,
                                            //         external: false // Open inside the LINE app
                                            //     });
                                            // } else {
                                            //     // Fallback for external browsers
                                            //     window.location.href = rewardUrl;
                                            // }
                                        }}>
                                        <RewardCard Reward={reward} />
                                    </button>
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
    );
};

export default RewardList;
