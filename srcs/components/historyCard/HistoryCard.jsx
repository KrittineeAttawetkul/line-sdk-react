import React from 'react'
import './historyCard.css'

const HistoryCard = ({ history }) => {

    const utcTime = new Date(history.transfer_at);
    const thailandTime = utcTime.toLocaleString('en-GB', {
        timeZone: 'Asia/Bangkok',
        hour12: false, // Use 24-hour format, set to true for 12-hour format
    });


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
                            <img src='https://fastly.picsum.photos/id/866/200/200.jpg?hmac=i0ngmQOk9dRZEzhEosP31m_vQnKBQ9C19TBP1CGoIUA' />
                        </div>
                        <div className='historyText'>
                            <div className='name'>
                                Name
                                <div className='historyDate'>
                                    {thailandTime}
                                </div>
                            </div>
                            <div className='comment'>
                                {history.comment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HistoryCard