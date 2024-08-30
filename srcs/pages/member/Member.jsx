import React, { useEffect, useState } from 'react'
import './member.css'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';

const Member = () => {

    const [lineProfile, setLineProfile] = useState(null);
    const [userCard, setUserCard] = useState({
        qr_url: ''
    });

    const [statusCard, setStatus] = useState(false);

    useEffect(() => {
        pageInit();
    }, [])

    useEffect(() => {
        if (statusCard) {
            console.log("user QR : ", userCard);
        }
    }, [statusCard])

    const pageInit = async () => {
        await useLineLogin(Liff_Id.member);
        userInit();
    }

    // ****function addon 
    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log

        const payload = { //ส่งเป็น obj
            user_id: profile.user_id
        }
        const res = await USER_ACTION.getCardByUserId(payload);
        console.log('user res: ', res);
        console.log('res Data: ', res.data);
        if (res.status) {
            setStatus(res.status)
            setUserCard(res.data)
            // console.log('user Card ', userCard);
        } else {
            setStatus(res.status)
            console.log("getQrByUserId (Error) : Error Api ");
        }

    }

    return (
        <>
            <div className='memberContainer'>
                <div className='memberBox'>
                    {lineProfile ? (
                        <>
                            <div className='memberCard'>
                                {statusCard && userCard.card_url !== "" ? (
                                    <>
                                        <img src={`${BASE_URL.baseApi}${userCard.card_url}`} />
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
                {/* <div className='title'>
                    บัตรสมาชิก
                </div> */}
            </div>
        </>
    )
}

export default Member