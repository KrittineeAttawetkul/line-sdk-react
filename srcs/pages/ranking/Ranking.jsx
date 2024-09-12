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
    // userInit();
  }

  // ****function addon 
  // const userInit = async () => {
  //   const storedProfile = localStorage.getItem('lineProfile');
  //   console.log('Stored Profile:', storedProfile); // Debugging log
  //   const profile = storedProfile ? JSON.parse(storedProfile) : null;
  //   setLineProfile(profile);
  //   console.log('Parsed Profile:', profile); // Debugging log

  //   const payload = { //ส่งเป็น obj
  //     user_id: profile.user_id,
  //     pageNo: {
  //       all: 1,
  //       earn: 1,
  //       burn: 1
  //     },
  //     itemPerPage: 10
  //   }
  //   const res = await USER_ACTION.historyTransfer(payload);
  //   console.log('user res: ', res);
  //   console.log('res Data: ', res.data);
  //   console.log('res Data all: ', res.data.all);
  //   console.log('res Data earn: ', res.data.earn);
  //   console.log('res Data burn: ', res.data.burn);
  // }

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