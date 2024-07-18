import React, { useEffect, useState } from 'react'
import './myQr.css'
import useLineLogin from '../../components/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { USER_ACTION } from '../../apis/userApi'

const MyQr = () => {

  const [lineProfile, setLineProfile] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    pageInit();
  }, [])

  const pageInit = async () => {
    // await useLineLogin(Liff_Id.my_qr);
    await userInit();
  }

  const userInit = async() => {
    const storedProfile = localStorage.getItem('lineProfile');
    console.log('Stored Profile:', storedProfile); // Debugging log
    const profile = storedProfile ? JSON.parse(storedProfile) : null;
    setLineProfile(profile);
    console.log('Parsed Profile:', profile); // Debugging log
    if (!!profile) {
      profile = {
        "id_token": null,
        "display_name": "KΓΙΤΤΙΝΞΞ",
        "picture_url": "https://profile.line-scdn.net/0hT3lRjLChCxxBKxsOBkx1YzF7CHZiWlIOOE9NeyEvBisvExhObBgTeCQjVHx6S0wZOU9MKHN7VyVNOHx6X333KEYbVi19H0VKb0VG_w",
        "status_messeage": "Bambam Status Message",
        "user_id": "U4ed202ba32ea29aa7a38b04ae2efabae",
        "access_token": "eyJhbGciOiJIUzI1NiJ9.a6FOGGTC3GV-68zz9YHFW0jG1sHeKsZaAuh76CNddqI0wLIZNZUSPg4HHnMUrxVeSd4wcqUV48-uu99XQ97dDmwZHIdC9WohKWpj0r_atbQNPhyQOEIM-R__K2c-cINDTUrMwG_2T6Phd_Hd2Zqqhb6n9saftTtUfno9T-BmcYg.bqoc2IU_UmXO6OB18g8eK5tZ1Gs-1fopKZ-019G3ERY"
    }
      const res = await USER_ACTION.getUserByUserId(profile.user_id);
      console.log('user res: ', res);
    }
  }

  return (
    <>
      {lineProfile ? (
        <div className='myQrContainer'>
          <div className='myQrBox'>
            <div className='myQrImg'>
              <img src={lineProfile.picture_url} alt="Profile" />
              <p>{lineProfile.display_name}</p>
              <p>{lineProfile.user_id}</p>
            </div>
            <div className='userList'>
              {userList.length > 0 ? (
                userList.map((user, index) => (
                  <div key={index} className='userItem'>
                    <p>{user.user_id}</p>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
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