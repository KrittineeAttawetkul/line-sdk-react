import React from 'react'
import './pointCard.css'

const PointCard = () => {
    return (
        <>
            <div className='PointCardContainer'>
                <div>
                    Your Nilecon Points
                </div>
                <div className='PointBox'>
                    <div>
                        คะแนนคงเหลือ
                    </div>
                    <div className='PointText'>
                        659
                    </div>
                    <div>
                        Points
                    </div>
                </div>
                <div>
                    my line name
                </div>
            </div>
        </>
    )
}

export default PointCard