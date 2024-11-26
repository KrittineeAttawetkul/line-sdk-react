import React, { useState } from 'react';
import './rewardVerify.css';
import Button from '../../../components/Button/Button';
import { useLocation } from 'react-router-dom';
import { POPUP } from '../../../components/popUp/PopUP';
import { USER_ACTION } from '../../../apis/userApi';
import { BASE_URL } from "../../../config/HostConfig";

const RewardVerify = () => {
    const location = useLocation();
    const { reward, user_id, balance } = location.state || {};
    const [loading, setLoading] = useState(false);

    const redeem = async () => {
        // Validate inputs
        if (!reward || !user_id || balance < reward.reward_price) {
            POPUP.errorPopUp({
                title: 'ข้อมูลไม่ถูกต้อง',
                html: `<span class="small-text">กรุณาตรวจสอบข้อมูลการแลกของ</span>`,
            });
            return;
        }

        setLoading(true);
        try {
            const redeemPayload = {
                sender_id: user_id,
                reward_id: reward.reward_id,
            };
            console.log('redeemPayload ', redeemPayload);

            const res = await USER_ACTION.RewardRedeem(redeemPayload);
            console.log('redeem', res);

            const total = balance - reward.reward_price;

            if (res.status) {
                POPUP.successPopUp({
                    title: 'แลกรางวัลสำเร็จ',
                    html: `<span class="small-text">คุณมียอดคงเหลือ </span><span class="large-text">${total} </span><span class="small-text">คะแนน</span>`,
                    function: () => {
                        liff.closeWindow();
                    }
                });
            } else {
                POPUP.errorPopUp({
                    title: 'เกิดข้อผิดพลาด',
                    html: `<span class="small-text">ไม่สามารถแลกคะแนนได้</span>`,
                });
            }
        } catch (error) {
            console.error('Error redeeming reward:', error);
            POPUP.errorPopUp({
                title: 'เกิดข้อผิดพลาด',
                html: `<span class="small-text">โปรดลองอีกครั้งในภายหลัง</span>`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='rewardVerifyContainer'>
            <div className='rewardVerifyBox'>
                <div className='rewardVerifyTitle'>
                    ยืนยันการแลกสินค้า
                </div>
                <div className='rewardBoxContainer'>
                    <div className='rewardBox'>
                        <div className='rewardPic'>
                            <img
                                src={`${BASE_URL.baseApi}/${reward?.reward_url}` || 'https://fastly.picsum.photos/id/419/500/300.jpg?hmac=nav6fNv5jNUzZZwMyUPGSGILObchi-eNRdPfQVbpkB0'}
                                alt={reward?.reward_name || 'Unknown Reward'}
                            />
                        </div>
                        <div className='rewardDetail'>
                            <div className='rewardName'>
                                {reward?.reward_name || 'Unknown Reward'}
                            </div>
                            <div className='rewardPrice'>
                                {reward?.reward_price || 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rewardVerifyBtn'>
                    <Button
                        text={loading ? 'กำลังดำเนินการ...' : 'ยืนยัน'}
                        onClick={redeem}
                        disabled={loading}  // Disable button when loading
                    />
                </div>
            </div>
        </div>
    );
};

export default RewardVerify;
