import React, { useEffect, useState } from 'react'
import './ranking.css'
import History from './history/History'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'

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
          <p>Ranking</p>
        </div>
        <div className='historyBox'>
          <History />
        </div>
      </div>
    </>
  )
}

export default Ranking