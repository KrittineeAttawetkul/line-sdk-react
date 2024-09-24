import React, { useEffect, useState } from 'react'
import './memberCard.css'
import { BASE_URL } from '../../config/HostConfig'
import LoadingIcon from '../loadingIcon/LoadingIcon'

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
                                        <img src={`${BASE_URL.baseApi}${userCard.card_url}`}
                                            alt="Member Card"
                                            draggable={false}
                                        />
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
                                    <LoadingIcon />
                                )}
                            </div>
                        </>
                    ) : (
                        <LoadingIcon />
                    )}
                    <div className='overlay' onContextMenu={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />
                </div>
            </div>
        </>
    )
}


export default MemberCard