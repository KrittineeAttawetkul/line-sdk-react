import React from 'react'
import './pointCard.css'

const PointCard = () => {
    return (
        <>
            <div className='pointCardContainer'>
                <div className='pointCardBox'>
                    <div className='title'>
                        คะแนนปัจจุบัน
                    </div>
                    <div className='icon'>
                        <img src='https://fastly.picsum.photos/id/901/200/200.jpg?hmac=BofL61KMrHssTtPwqR7iI272BvpjGsjt5PJ_ultE4Z8' />
                    </div>
                    <div className='point'>
                        <div className='num'>658</div>
                        <div className='end'>คะแนน</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PointCard