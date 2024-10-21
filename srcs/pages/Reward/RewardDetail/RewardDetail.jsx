import { useEffect, useState } from 'react';
import liff from '@line/liff';
import Liff_Id from '../../../assets/Liff_Id';
import { USER_ACTION } from '../../../apis/userApi';
import useLineLogin from '../../../utils/addons/useLineLogin';
import './rewardDetail.css';

const RewardDetail = () => {
    const [rewardId, setRewardId] = useState(null);
    const [lineProfile, setLineProfile] = useState(null);
    const [RewardStatus, setRewardStatus] = useState(null);
    const [BalanceStatus, setBalanceStatus] = useState(null);
    const [RewardData, setRewardData] = useState(null);
    const [BalanceData, setBalanceData] = useState(null);

    useEffect(() => {
        pageInit();
    }, []);

    // Run userInit only when rewardId is available
    useEffect(() => {
        if (rewardId) {
            userInit();
        }
    }, [rewardId]);

    const pageInit = async () => {
        try {
            await useLineLogin(Liff_Id.rewardDetail);
            const params = new URLSearchParams(window.location.search);
            const rewardId = params.get('reward_id');
            setRewardId(rewardId); // Setting rewardId here will trigger userInit from useEffect
            userInit();
        } catch (err) {
            console.error(err);
        }
    };

    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);

        const rewardPayload = {
            reward_id: rewardId,
            // reward_id: 'RW-15102024-1271',
        };

        const userPayload = {
            user_id: profile.user_id
            // user_id: 'U956e1520ac3235c6778f4725b4b09200'
        }

        try {
            const reward = await USER_ACTION.getRewardByReward_id(rewardPayload);
            if (reward.status) {
                setRewardStatus(reward.status);
                setRewardData(reward.data);
            } else {
                setRewardStatus(reward.status);
                console.error("Error reward API");
            }

            const balance = await USER_ACTION.getCardByUserId(userPayload);

            if (balance.status) {
                setBalanceStatus(balance.data);
                setBalanceData(balance.data.balance);
                // setBalanceData('10');
            } else {
                setBalanceStatus(balance.status);
                console.error("Error balance API");
            }
        } catch (error) {
            console.error("Error fetching ", error);
        }
    };

    return (
        <>
            {RewardData && BalanceData ? (
                <div className='rewardDetailContainer'>
                    <div className='rewardDetailBox'>
                        <div className='rewardDetailTitle'>
                            รางวัล
                        </div>
                        <div className='rewardDetailPic'>
                            <img src={RewardData.reward_url} alt={RewardData.reward_name} />
                        </div>
                        <div className='dataBox'>
                            <div className='rewardDetailName'>
                                {RewardData.reward_name}
                            </div>
                            <div className='rewardDetailAmount'>
                                In stock : {RewardData.available_reward_amount}
                            </div>
                            <div className='rewardDetailExp'>
                                หมดอายุ {formatDateTimeToThailand(RewardData.reward_end)}
                            </div>
                            <hr />
                            <div className='rewardDetailDetailTitle'>
                                รายละเอียด
                            </div>
                            <div className='rewardDetail'>
                                {RewardData.reward_detail}
                            </div>
                        </div>
                    </div>
                    <div className='rewardDetailFooter'>
                        <div className='rewardDetailFooterBox'>
                            <div className='rewardBalance'>
                                {BalanceData}
                            </div>
                            <div className='rewardPrice'>
                                /{RewardData.reward_price}
                            </div>
                            <div >
                                <button className={`rewardDetailBtn ${BalanceData < RewardData.reward_price ? 'disabled' : ''}`} disabled={BalanceData < RewardData.reward_price}>
                                    แลก
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading reward details...</p>
            )}
        </>
    );
};

function formatDateTimeToThailand(utcDateString) {
    const utcTime = new Date(utcDateString);
    const optionsDate = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    const thailandDate = utcTime.toLocaleDateString('th-TH', {
        ...optionsDate,
        timeZone: 'Asia/Bangkok',
        calendar: 'buddhist',
    });
    const thailandTime = utcTime.toLocaleTimeString('th-TH', {
        ...optionsTime,
        timeZone: 'Asia/Bangkok',
    });

    return `${thailandDate},${thailandTime}`;
}

export default RewardDetail;
