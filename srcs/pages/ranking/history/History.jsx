import React, { useCallback, useEffect, useRef, useState } from 'react'
import './history.css'
import HistoryCard from '../../../components/historyCard/HistoryCard';
import { USER_ACTION } from '../../../apis/userApi'
import LoadingIcon from '../../../components/loadingIcon/LoadingIcon'

const History = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setPage(1); // Reset to the first page
        if (tab === 'tab1') {
            setAllHistory([]); // Clear all history to load new posts
        } else if (tab === 'tab2') {
            setEarnHistory([]); // Clear earn history
        } else {
            setBurnHistory([]); // Clear burn history
        }
        setHasMore(true); // Reset hasMore to true
        setLoading(false);
    };

    const [allHistory, setAllHistory] = useState([]);
    const [earnHistory, setEarnHistory] = useState([]);
    const [burnHistory, setBurnHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const isInitialMount = useRef(true); // Track the first mount
    const [payload, setPayload] = useState({
        user_id: '',
        pageNo: {
            all: '',
            earn: '',
            burn: ''
        },
        itemPerPage: ''
    });

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        setPayload({
            user_id: JSON.parse(localStorage.getItem('lineProfile')).user_id,
            pageNo: {
                all: 1,
                earn: 1,
                burn: 1
            },
            itemPerPage: 3
        });
    }

    const loadMorePosts = useCallback(async () => {
        setLoading(true);

        const updatedPayload = {
            ...payload,
            pageNo: {
                all: activeTab === 'tab1' ? page : 1,
                earn: activeTab === 'tab2' ? page : 1,
                burn: activeTab === 'tab3' ? page : 1
            }
        };

        const newPosts = await USER_ACTION.historyTransfer(updatedPayload);

        let postsToAdd = [];
        if (activeTab === 'tab1') {
            postsToAdd = newPosts.data.all;
        } else if (activeTab === 'tab2') {
            postsToAdd = newPosts.data.earn;
        } else {
            postsToAdd = newPosts.data.burn;
        }

        if (postsToAdd.length === 0) {
            setHasMore(false); // No more posts
        } else {
            if (activeTab === 'tab1') {
                setAllHistory((prevPosts) => [...prevPosts, ...postsToAdd]);
            } else if (activeTab === 'tab2') {
                setEarnHistory((prevPosts) => [...prevPosts, ...postsToAdd]);
            } else {
                setBurnHistory((prevPosts) => [...prevPosts, ...postsToAdd]);
            }
        }
        setLoading(false);
    }, [page, payload, activeTab]);

    const lastPostElementRef = useCallback(
        (node) => {
            if (loading || !hasMore) return; // Stop observing if loading or no more posts
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1); // Trigger loading of new posts by changing page number
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Skip the first render
        } else if (hasMore) {
            loadMorePosts();
        }
    }, [loadMorePosts, hasMore, isInitialMount]);

    return (
        <div className="tab-container">
            {/* Tab headers */}
            <div className="tabs">
                <button
                    className={activeTab === 'tab1' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('tab1')}
                >
                    รวมทั้งหมด
                </button>
                <button
                    className={activeTab === 'tab2' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('tab2')}
                >
                    คะแนนที่ได้รับ
                </button>
                <button
                    className={activeTab === 'tab3' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('tab3')}
                >
                    คะแนนที่ถูกใช้
                </button>
            </div>

            {/* Tab content */}
            <div className={`tab-content ${loading ? '' : allHistory.length === 0 ? 'none' : earnHistory.length === 0 ? 'none' : burnHistory.length === 0 ? 'none' : ''}`}>
                {activeTab === 'tab1' && <div>
                    <div className='content'>
                        <ul>
                            {allHistory.map((history, i) => (
                                <li
                                    key={i}
                                    ref={allHistory.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <LoadingIcon /> : allHistory.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                    </div>
                </div>}

                {activeTab === 'tab2' && <div>
                    <div className='content'>
                        <ul>
                            {earnHistory.map((history, i) => (
                                <li
                                    key={i}
                                    ref={earnHistory.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <LoadingIcon /> : earnHistory.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                    </div>
                </div>}

                {activeTab === 'tab3' && <div>
                    <div className='content'>
                        <ul>
                            {burnHistory.map((history, i) => (
                                <li
                                    key={i}
                                    ref={burnHistory.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <LoadingIcon /> : burnHistory.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default History;
