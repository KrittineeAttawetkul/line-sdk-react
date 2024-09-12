import React, { useEffect, useState } from 'react'
import './history.css'
import HistoryCard from '../../../components/historyCard/HistoryCard';
import { USER_ACTION } from '../../../apis/userApi'
import Button from '../../../components/Button/Button'


const History = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [lineProfile, setLineProfile] = useState(null);
    const [History, setHistory] = useState([]);

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        userInit();
    }

    // ****function addon 
    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log

        gethistoryTransfer(profile.user_id, activeTab)
    }

    const gethistoryTransfer = async (user_id, type) => {
        const payload = { //ส่งเป็น obj
            user_id: user_id,
            pageNo: {
                all: 1,
                earn: 1,
                burn: 1
            },
            itemPerPage: 4
        }
        setActiveTab(type);
        const res = await USER_ACTION.historyTransfer(payload)
        if (res.status) {
            console.log('user res: ', res);

            const data = res.data;

            console.log("data :", data);

            if (type === "tab1") {
                setHistory(res.data.all)
            } else if (type === "tab2") {
                setHistory(res.data.earn)
            } else if (type === "tab3") {
                setHistory(res.data.burn)
            }
        }
    }

    return (
        <div className="tab-container">
            {/* Tab headers */}
            <div className="tabs">
                <button
                    className={activeTab === 'tab1' ? 'tab active' : 'tab'}
                    onClick={() => gethistoryTransfer(lineProfile.user_id, 'tab1')}
                >
                    รวมทั้งหมด
                </button>
                <button
                    className={activeTab === 'tab2' ? 'tab active' : 'tab'}
                    onClick={() => gethistoryTransfer(lineProfile.user_id, 'tab2')}
                >
                    คะแนนที่ได้รับ
                </button>
                <button
                    className={activeTab === 'tab3' ? 'tab active' : 'tab'}
                    onClick={() => gethistoryTransfer(lineProfile.user_id, 'tab3')}
                >
                    คะแนนที่ถูกใช้
                </button>
            </div>


            {/* Tab content */}

            {History?.length > 0 ? (
                <div className="tab-content">
                    {activeTab === 'tab1' && <div>
                        <div className='content'>
                            {History.map((history) => (
                                <HistoryCard history={history} />
                            ))}
                        </div>
                    </div>}
                    {activeTab === 'tab2' && <div>
                        <div className='content'>
                            {History.map((history) => (
                                <HistoryCard history={history} />
                            ))}
                        </div>
                    </div>}
                    {activeTab === 'tab3' && <div>
                        <div className='content'>
                            {History.map((history) => (
                                <HistoryCard history={history} />
                            ))}
                        </div>
                    </div>}
                </div>
            ) : (
                <div className="tab-content none">
                    {activeTab === 'tab1' && <div>
                        <div className='content'>
                            ยังไม่มีประวัติ
                        </div>
                    </div>}
                    {activeTab === 'tab2' && <div>
                        <div className='content'>
                            ยังไม่มีประวัติ
                        </div>
                    </div>}
                    {activeTab === 'tab3' && <div>
                        <div className='content'>
                            ยังไม่มีประวัติ
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
}

export default History