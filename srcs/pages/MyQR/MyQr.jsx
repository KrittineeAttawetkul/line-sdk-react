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
      <div className='myCardContainer'>
        <div className='myCardBox'>
          <div className='myCardQR'>
            {lineProfile ? (
              <div>
                <p>{lineProfile.display_name}</p>
                <img src={lineProfile.picture_url} alt="Profile" />
                <p>User ID: {lineProfile.user_id}</p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
          <div>
            <a href='#'>
              <button className='mycardBtn'>
                Scan
              </button>
            </a>
          </div>
        </div>
      </div>

    </>
  )
}

export default MyQr