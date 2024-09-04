import React, { useEffect, useState } from 'react'
import './member.css'
import MemberCard from '../../components/memberCard/MemberCard'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'

const Member = () => {

    // const [lineProfile, setLineProfile] = useState(null);
    // const [userCard, setUserCard] = useState({
    //     card_url: ''
    // });
    const [statusCard, setStatus] = useState(false);
    const [data, setData] = useState({ userCard: '', lineProfile: null });

    useEffect(() => {
        pageInit();
    }, [])

    useEffect(() => {
        if (statusCard) {
            console.log("userCard : ", data.userCard);
        }
    }, [statusCard])

    const pageInit = async () => {
        await useLineLogin(Liff_Id.member);
        userInit();
    }

    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        // setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log

        const payload = {
            user_id: profile.user_id
        }
        const res = await USER_ACTION.getCardByUserId(payload);
        console.log('user res: ', res);
        console.log('res Data: ', res.data);

        if (res.status) {
            setStatus(res.status);
            // setUserCard(res.data);
            setData({
                userCard: res.data,
                lineProfile: profile
            });
        } else {
            console.log("getCardByUserId (Error) : Error Api ");
        }
    }

    return (
        <>
            <div className='memberCardBox'>
                <MemberCard data={data} />
            </div>
        </>
    )
}

export default Member
