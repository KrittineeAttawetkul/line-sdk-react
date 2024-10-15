import React from 'react'
import './rewardListHeader.css'

const RewardListHeader = () => {
  return (
    <>
      <div className='rewardListHeaderContainer'>
        <div className='rewardListHeaderBox'>
          <div className='rewardListHeaderTitle'>
            รายการของรางวัล
          </div>
          <div className='rewardListHeaderBtn'>
            <button>ประวัติการแลก</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RewardListHeader