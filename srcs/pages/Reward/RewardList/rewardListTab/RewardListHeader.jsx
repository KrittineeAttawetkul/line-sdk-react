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
            <a href='https://www.podsland.com/nilecon-hr/rewardhistory'>
              <button>ประวัติการแลก</button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default RewardListHeader