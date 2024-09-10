import React, { useState } from 'react'
import './history.css'
import HistoryCard from '../../../components/historyCard/HistoryCard';

const Histrory = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
            <div className="tab-content">
                {activeTab === 'tab1' && <div>
                    <div className='content'>
                        <HistoryCard />
                        <HistoryCard />
                        <HistoryCard />
                        <HistoryCard />
                        <HistoryCard />
                    </div>
                </div>}
                {activeTab === 'tab2' && <div>
                    <div className='content'>
                        <HistoryCard />
                        <HistoryCard />
                    </div>
                </div>}
                {activeTab === 'tab3' && <div>
                    <div className='content'>
                        <HistoryCard />
                        <HistoryCard />
                        <HistoryCard />
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Histrory