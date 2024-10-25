import React from 'react';
import './rewardCard.css';

const RewardCard = ({ Reward }) => {
    // Check if the reward_end is valid and create a date object
    const utcTime = Reward.reward_end ? new Date(Reward.reward_end) : new Date();

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

    return (
        <div className='rewardCard-container'>
            <div className='rewardCard-box'>
                <div className='rewardPic'>
                    <img
                        className='img'
                        src={Reward.reward_url || 'https://fastly.picsum.photos/id/16/500/300.jpg?hmac=SU2Y-E3ZP-ugNciYn7JT774pevCOLNShSuN3XPEk0Ag'}
                        alt="Reward"
                    />
                </div>
                <div className='rewardCard-text'>
                    <div className='rewardName'>
                        {Reward.reward_name || "Unnamed Reward"}
                    </div>
                    <div className='rewardPoint'>
                        {Reward.reward_price !== undefined ? Reward.reward_price : "N/A"}
                    </div>
                    <div className='rewardBottom'>
                        <div className='rewardAmount'>
                            In stock: {Reward.available_amount !== undefined ? Reward.available_amount : "0"}
                        </div>
                        <div className='rewardExp'>
                            EXP {formattedDateTime}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardCard;
