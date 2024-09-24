import React from 'react'
import './historyCard.css'
import { BASE_URL } from '../../config/HostConfig';

const HistoryCard = ({ history }) => {
    // console.log('comp data:',history);
    const utcTime = new Date(history.transfer_at);
    // Format the date
    const optionsDate = {
        day: 'numeric',
        month: 'short', // 'short' will give abbreviated month like ก.ย.
    };
    // Format the time
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    };
    // Convert to Thailand time
    const thailandDate = utcTime.toLocaleDateString('th-TH', {
        ...optionsDate,
        timeZone: 'Asia/Bangkok'
    });
    const thailandTime = utcTime.toLocaleTimeString('th-TH', {
        ...optionsTime,
        timeZone: 'Asia/Bangkok'
    });
    // Combine date and time
    const formattedDateTime = `${thailandDate} , ${thailandTime} น.`;


    return (
        <>
            <div className='historyCardContainer'>
                <div className='historyCardText'>
                    <div className='historyType'>
                        <div>{history.point_type === 'earn' ? "คะแนนที่ได้รับ" : history.point_type === 'burn' ? 'คะแนนที่ถูกใช้' : ""}</div>
                        <div className={`${history.point_type === 'earn' ? "earn" : history.point_type === 'burn' ? 'burn' : ""}`}>
                            {history.point_type === 'earn' ? `+${history.point_amount} คะแนน` : history.point_type === 'burn' ? `-${history.point_amount} คะแนน` : ""}
                        </div>
                    </div>
                    <hr />
                    <div className='historyData'>
                        <div className='historyPic'>
                            <img src={history.pictureUrl ? history.pictureUrl : `${BASE_URL.baseApi}/images/NileconProfile.png`} />
                        </div>
                        <div className='historyText'>
                            <div className='name'>
                                {history.displayName ? history.displayName : 'Nilecon HR'}
                                <div className='historyDate'>
                                    {formattedDateTime}
                                </div>
                            </div>
                            <div className='comment'>
                                {history.comment}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='overlay' onContextMenu={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />
            </div>

        </>
    )
}

export default HistoryCard