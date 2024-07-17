import React, { useEffect, useState } from 'react'
import './myQr.css'
import useLineLogin from '../../components/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'

const MyQr = () => {

  const [lineProfile, setLineProfile] = useState(null);

  useEffect(() => {
    LineLogin();
  }, [])

  const LineLogin = async () => {
    await useLineLogin(Liff_Id.my_qr);
    const storedProfile = localStorage.getItem('lineProfile');
    console.log('Stored Profile:', storedProfile); // Debugging log
    const profile = storedProfile ? JSON.parse(storedProfile) : null;
    setLineProfile(profile);
    console.log('Parsed Profile:', profile); // Debugging log
  }

  return (
    <>
      {lineProfile ? (
        <div className='myQrContainer'>
          <div className='myQrBox'>
            <p>{lineProfile.display_name}</p>
            <div className='myQrImg'>
              <img src={lineProfile.picture_url} alt="Profile" />
            </div>
            <div>
              <p>User ID: {lineProfile.user_id}</p>
            </div>
            <div>
              <a href='#'>
                <button className='myQrBtn'>
                  Scan
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  )
}

export default MyQr