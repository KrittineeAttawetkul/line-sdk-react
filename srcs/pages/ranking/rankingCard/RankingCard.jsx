import React, { useEffect, useState } from 'react'
import './rankingCard.css'
import PointCard from './pointCard/PointCard'
import RankingBar from '../../../components/RankingBar/RankingBar'

const RankingCard = () => {

    return (
        <>
            <div className='rankingCardContainer'>
                <div className='rankingCardBox'>
                    <div className='rankingCardTop'>
                        <div className='rankingProfile'>
                            <div className='rankingProfilePic'>
                                <img src='https://fastly.picsum.photos/id/797/200/200.jpg?hmac=-S9mzdkNyeh-FXTUE04cyqzvAV1W2D80OVQtTQHNt-k' />
                            </div>
                            <div className='Data'>
                                <div className='Name'>
                                    Name
                                </div>
                                <div className='pointBalance'>
                                    <PointCard />
                                </div>
                            </div>
                        </div>
                        <div className='ps'>
                            หมายเหตุ : คะแนนนี้ได้มาจากการช่วยเหลือต่อเพื่อนร่วมงานและการเข้าร่วมกิจกรรมของบริษัท
                            เช่น outing และ meeting
                        </div>
                    </div>
                    <hr />
                    <div className='rankingCardBottom'>
                        <RankingBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RankingCard