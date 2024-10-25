import React from 'react'
import './rewardHistoryCard.css'

const RewardHistoryCard = ({ Reward }) => {
    // Check if the reward_end is valid and create a date object
    const utcTime = Reward.redeem_at ? new Date(Reward.redeem_at) : new Date();

    // Format the date
    const optionsDate = {
        day: 'numeric',
        month: 'short', // 'short' will give abbreviated month like ก.ย.
    };

    // Format the time
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    };

    // Convert to Thailand time
    const thailandDate = utcTime.toLocaleDateString('th-TH', {
        ...optionsDate,
        timeZone: 'Asia/Bangkok'
    });

    const thailandTime = utcTime.toLocaleTimeString('th-TH', {
        ...optionsTime,
        timeZone: 'Asia/Bangkok'
    });

    // Combine date and time
    const formattedDateTime = `${thailandDate} , ${thailandTime} น.`;

    let rewardStatusTxt = ''
    if (Reward.reward_status === 'n') {
        rewardStatusTxt = 'ยังไม่ได้ของ'
    }
    else if (Reward.reward_status === 'y') {
        rewardStatusTxt = 'ได้รับของแล้ว'
    }
    else if (Reward.reward_status === 'c') {
        rewardStatusTxt = 'ยกเลิก'
    }

    return (
        <>
            <div className='RewardHistoryCardContainer'>
                <div className='RewardHistoryCardBox'>
                    <div className='rewardPic'>
                        <img
                            src={Reward.reward_url || 'https://fastly.picsum.photos/id/16/500/300.jpg?hmac=SU2Y-E3ZP-ugNciYn7JT774pevCOLNShSuN3XPEk0Ag'}
                            alt="Reward"
                        />
                    </div>
                    <div className='rewardDetail'>
                        <div className='rewardName'>
                            {Reward.reward_name}
                            <div className='rewardRedeemDate'>
                                แลกวันที่ {formattedDateTime}
                            </div>
                        </div>
                        <div className='rewardBottom'>
                            <div className='rewardPoint'>
                                {Reward.reward_price}
                            </div>
                            <div className={`${Reward.reward_status === 'y' ? 'rewardStatusBoxDone' : Reward.reward_status === 'c' ? 'rewardStatusBoxCancel' : 'rewardStatusBox'}`} >
                                <div className='rewardStatus'>
                                    {rewardStatusTxt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RewardHistoryCard