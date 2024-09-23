import React from 'react'
import './pointCard.css'
import silverIcon from '../../../../assets/silverIcon.png'
import goldIcon from '../../../../assets/goldIcon.png'
import platinumIcon from '../../../../assets/platinumIcon.png'

const PointCard = (props) => {

    const { lv_name, balance } = props;

    console.log('lv_name',lv_name);

    let icon;
    if (lv_name === 'Silver') {
        icon = silverIcon
    } else if (lv_name === 'Gold') {
        icon = goldIcon
    } else if (lv_name === 'Platinum') {
        icon = platinumIcon
    }

    return (
        <>
            <div className='pointCardContainer'>
                <div className='pointCardBox'>
                    <div className='title'>
                        คะแนนปัจจุบัน
                    </div>
                    <div className='icon'>
                        <img src={icon} />
                    </div>
                    <div className='point'>
                        <div className='num'>{balance}</div>
                        <div className='end'>คะแนน</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PointCard