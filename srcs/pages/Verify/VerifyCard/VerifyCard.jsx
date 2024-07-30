import React from 'react'
import './verifyCard.css'

const VerifyCard = () => {
    return (
        <>
            <div className='verifyCardContainer'>
                <div className='verifyCardBox'>
                    <div className='verifyCardPoint'>
                        จำนวนคะแนน
                        <div className='point'>
                            1.00
                        </div>
                    </div>
                    <div className='Line'></div>
                    <div className='verifyCardComment'>
                        เหตุผลการให้คะแนน
                        <div className='point'>
                            Comment
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyCard