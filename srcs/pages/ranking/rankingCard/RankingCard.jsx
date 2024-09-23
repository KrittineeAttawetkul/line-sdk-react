import React, { useEffect, useState } from 'react'
import './rankingCard.css'
import PointCard from './pointCard/PointCard'
import RankingBar from '../../../components/RankingBar/RankingBar'
import { USER_ACTION } from '../../../apis/userApi'

const RankingCard = () => {

    // const [lineProfile, setLineProfile] = useState(null);

    const [data, setData] = useState({ userCard: '', lineProfile: null });

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
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
            // user_id: 'U956e1520ac3235c6778f4725b4b09200'
        }

        const res = await USER_ACTION.getCardByUserId(payload);
        console.log('user res: ', res);
        console.log('res Data: ', res.data);

        if (res.status) {
            setData({
                lv_name: res.data.lv_name,
                balance: res.data.balance,
                lineProfile: profile
                // lineProfile: {
                //     display_name: "KΓΙΤΤΙΝΞΞ",
                //     picture_url: "https://profile.line-scdn.net/0hT3lRG4bpCxxBKxu4e151YzF7CHZiWlIOOE9NeyEvBisvExhObBgTeCQjVHx6S0wZOU9MKHN7VyVNOHx6X333KEYbVi19HExPbEVE-A",
                //     status_messeage: "Status Message TestTest",
                //     user_id: "U956e1520ac3235c6778f4725b4b09200",
                // }
            });
            console.log('data.lineProfile', data.lineProfile);
        } else {
            console.log("getBalanceByUserId (Error) : Error Api ");
        }
    }

    return (
        <>
            <div className='rankingCardContainer'>
                {data.lineProfile ? (
                    <div className='rankingCardBox'>
                        <div className='rankingCardTop'>
                            <div className='rankingProfile'>
                                <div className='rankingProfilePic'>
                                    <img src={data.lineProfile.picture_url ? data.lineProfile.picture_url : 'https://fastly.picsum.photos/id/794/200/200.jpg?hmac=qNLJvkiBmg4TyCSCwU__daf9sb5La0_1eRzJewRgIyU'} />
                                </div>
                                <div className='Data'>
                                    <div className='Name'>
                                        {data.lineProfile.display_name}
                                    </div>
                                    <div className='pointBalance'>
                                        <PointCard
                                            balance={data.balance}
                                            lv_name={data.lv_name} />
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
                ) : (
                    <div>
                        Loading
                    </div>
                )
                }
            </div>

        </>
    )
}

export default RankingCard