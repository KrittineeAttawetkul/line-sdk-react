import React, { useEffect, useState } from 'react'
import './memberCard.css'
import { BASE_URL } from '../../config/HostConfig'

const MemberCard = ({ data }) => {
    const { userCard, lineProfile } = data;
    // console.log('MemberCard', lineProfile);


    return (
        <>
            <div className='memberContainer'>
                <div className='memberBox'>
                    {lineProfile ? (
                        <>
                            <div className='memberCard'>
                                {userCard && userCard !== "" ? (
                                    <>
                                        <img src={`${BASE_URL.baseApi}${userCard.card_url}`} alt="Member Card" draggable={false} />
                                        <div className='cardText'>
                                            <div className='point'>
                                                Points
                                            </div>
                                            <div className='balance'>
                                                {userCard.balance}
                                            </div>
                                            <div className='name'>
                                                {lineProfile.display_name}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p>Loading Card...</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            </div>
        </>
    )
}


export default MemberCard