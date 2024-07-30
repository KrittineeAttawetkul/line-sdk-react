import React, { useEffect, useState } from 'react'
import './myQr.css'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';
import Button from '../../components/Button/Button'

const MyQr = () => {

  const [lineProfile, setLineProfile] = useState(null);
  const [userList, setUserList] = useState({
    display_name: '',
    picture_url: '',
    status_message: '',
    qr_url: ''
  });

  useEffect(() => {
    pageInit();
  }, [])

  const pageInit = async () => {
    await useLineLogin(Liff_Id.my_qr);
    userInit();
  }

  // ****function addon 
  const userInit = async () => {
    const storedProfile = localStorage.getItem('lineProfile');
    console.log('Stored Profile:', storedProfile); // Debugging log
    const profile = storedProfile ? JSON.parse(storedProfile) : null;
    setLineProfile(profile);
    console.log('Parsed Profile:', profile); // Debugging log

    const payload = { //ส่งเป็น obj
      user_id: profile.user_id
    }
    const res = await USER_ACTION.getUserByUserId(payload);
    console.log('user res: ', res);
    console.log('res Data: ', res.data);
    setUserList(res.data)
    console.log('user List ', userList);
  }

  return (
    <>
      <div className='myQrContainer'>
        <div className='myQrBox'>
          {lineProfile ? (
            <>
              <div>
                <p>{userList.display_name}</p>
              </div>
              <div className='myQrImg'>
                <img src={`${BASE_URL.baseApi}${userList.qr_url}`} />
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
          <div>
            <a href='#'>
              <Button text='Scan' />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyQr