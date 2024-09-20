import React, { useCallback, useEffect, useRef, useState } from 'react'
import './history.css'
import HistoryCard from '../../../components/historyCard/HistoryCard';
import { USER_ACTION } from '../../../apis/userApi'



const History = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setPage(1); // Reset to the first page
        setHistory([]); // Clear the history to load new posts
        setHasMore(true); // Reset hasMore to true
        setLoading(false);
    };

    const [History, setHistory] = useState([]);
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

    // const [lineProfile, setLineProfile] = useState(null);

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        // userInit();
        setPayload({
            // user_id: 'U956e1520ac3235c6778f4725b4b09200',
            user_id: JSON.parse(localStorage.getItem('lineProfile')).user_id,
            pageNo: {
                all: 1,
                earn: 1,
                burn: 1
            },
            itemPerPage: 3
        })
    }

    // // ****function addon 
    // const userInit = async () => {
    //     const storedProfile = localStorage.getItem('lineProfile');
    //     console.log('Stored Profile:', storedProfile); // Debugging log
    //     const profile = storedProfile ? JSON.parse(storedProfile) : null;
    //     setLineProfile(profile);
    //     console.log('Parsed Profile:', profile); // Debugging log
    // }

    const loadMorePosts = useCallback(async () => {
        setLoading(true);

        // Update the page number based on the active tab
        const updatedPayload = {
            ...payload,
            pageNo: {
                all: activeTab === 'tab1' ? page : 1,
                earn: activeTab === 'tab2' ? page : 1,
                burn: activeTab === 'tab3' ? page : 1
            }
        };

        const newPosts = await USER_ACTION.historyTransfer(updatedPayload);

        const postsToAdd =
            activeTab === 'tab1' ? newPosts.data.all :
                activeTab === 'tab2' ? newPosts.data.earn :
                    newPosts.data.burn;

        console.log(newPosts.data);


        if (postsToAdd.length === 0) {
            setHasMore(false); // No more posts
        } else {
            setHistory((prevPosts) => [...prevPosts, ...postsToAdd]);
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
                // onClick={() => gethistoryTransfer(payload.user_id, 'tab1')}
                >
                    รวมทั้งหมด
                </button>
                <button
                    className={activeTab === 'tab2' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('tab2')}
                // onClick={() => gethistoryTransfer(payload.user_id, 'tab2')}
                >
                    คะแนนที่ได้รับ
                </button>
                <button
                    className={activeTab === 'tab3' ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick('tab3')}
                // onClick={() => gethistoryTransfer(payload.user_id, 'tab3')}
                >
                    คะแนนที่ถูกใช้
                </button>
            </div>


            {/* Tab content */}
            <div className={`tab-content ${loading ? '' : History.length === 0 ? 'none' : ''}`}>
                {activeTab === 'tab1' && <div>
                    <div className='content'>
                        <ul>
                            {History.map((history, i) => (
                                <li
                                    key={i} // Combines post.id with index to ensure uniqueness
                                    ref={History.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <p>Loading...</p> : History.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                    </div>
                </div>}
                {activeTab === 'tab2' && <div>
                    <div className='content'>
                        <ul>
                            {History.map((history, i) => (
                                <li
                                    key={i} // Combines post.id with index to ensure uniqueness
                                    ref={History.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <p>Loading...</p> : History.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                        {/* Message indicating no more posts */}
                    </div>
                </div>}
                {activeTab === 'tab3' && <div>
                    <div className='content'>
                        <ul>
                            {History.map((history, i) => (
                                <li
                                    key={i} // Combines post.id with index to ensure uniqueness
                                    ref={History.length === i + 1 ? lastPostElementRef : null}
                                >
                                    <HistoryCard history={history} />
                                </li>
                            ))}
                        </ul>
                        {loading ? <p>Loading...</p> : History.length === 0 ? <div>ยังไม่มีประวัติ</div> : ''}
                        {/* Message indicating no more posts */}
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default History