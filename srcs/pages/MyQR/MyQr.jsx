import React, { useEffect, useState } from 'react'
import './myQr.css'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';
import Button from '../../components/Button/Button'
import LoadingIcon from '../../components/loadingIcon/LoadingIcon'

const MyQr = () => {

  const [lineProfile, setLineProfile] = useState(null);
  const [userQr, setUserQr] = useState({
    qr_url: ''
  });

  const [statusQr, setStatus] = useState(false);

  useEffect(() => {
    pageInit();
  }, [])

  useEffect(() => {
    if (statusQr) {
      console.log("user QR : ", userQr);
    }
  }, [statusQr])

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
    const res = await USER_ACTION.getQrByUserId(payload);
    console.log('user res: ', res);
    console.log('res Data: ', res.data);
    if (res.status) {
      setStatus(res.status)
      setUserQr(res.data)
      // console.log('user QR ', userQr);
    } else {
      setStatus(res.status)
      console.log("getQrByUserId (Error) : Error Api ");

    }

  }

  return (
    <>
      <div className='myQrContainer'>
        <div className='myQrBox'>
          <div className='myQrBoxOverlay'>
            {lineProfile ? (
              <>
                <div className='title'>
                  คิวอาร์โค้ด
                </div>
                {statusQr && userQr.qr_url !== "" ? (
                  <img className='QRpic' src={`${BASE_URL.baseApi}${userQr.qr_url}`} />
                ) : (
                  <div className='LoadingQR'>
                    <LoadingIcon />
                  </div>
                )}
                <div className='name'>{lineProfile.display_name}</div>
              </>
            ) : (
              <div className='LoadingFull'>
                <LoadingIcon />
              </div>
            )}
            <div className='overlay' onContextMenu={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />
          </div>
          <div className='myQrBtn'>
            <a href='https://liff.line.me/2006140913-9Byp8ana'>
              <Button text='สแกนคิวอาร์โค้ด' />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyQr