import React, { useEffect, useState } from 'react'
import './ranking.css'
import History from './history/History'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import RankingCard from './rankingCard/RankingCard'
import RankingBG from '../../assets/RankingBG.png'

const Ranking = () => {
  const [lineProfile, setLineProfile] = useState(null);

  useEffect(() => {
    pageInit();
  }, [])

  const pageInit = async () => {
    await useLineLogin(Liff_Id.ranking);
  }

  return (
    <>
      <div className='rankingContainer'>
        <div className='rankingBox'>
          <div className='rankingBoxTitle'>
            ตารางคะแนน
          </div>
          <div className='rankingBoxPic'>
            <img src={RankingBG} />
          </div>
          <RankingCard />
        </div>
        <div className='historyBox'>
          <div className='historyBoxTitle'>
            ประวัติคะแนน
          </div>
          <History />
        </div>
      </div>
    </>
  )
}

export default Ranking