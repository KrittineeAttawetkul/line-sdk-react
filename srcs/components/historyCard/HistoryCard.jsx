import React from 'react'
import './historyCard.css'

const HistoryCard = () => {


    return (
        <>
            <div className='historyCardContainer'>
                <div className='historyCardText'>
                    <div className='historyType'>
                        <div>คะแนนที่ได้รับ</div>
                        <div className='point'>+1 คะแนน</div>
                    </div>
                    <hr />
                    <div className='historyData'>
                        <div className='historyPic'>
                            <img src='https://fastly.picsum.photos/id/866/200/200.jpg?hmac=i0ngmQOk9dRZEzhEosP31m_vQnKBQ9C19TBP1CGoIUA' />
                        </div>
                        <div className='historyText'>
                            <div className='name'>
                                Name
                            </div>
                            <div className='comment'>
                                ทำงานตรงเวลา ความใส่ใจในรายละเอียดและความมุ่งมั่นใน
                                การทำตามกำหนดเวลานั้นน่าประทับใจจริงๆ
                            </div>
                        </div>
                        <div className='historyDate'>
                            7 ส.ค.,11:59 น.
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HistoryCard