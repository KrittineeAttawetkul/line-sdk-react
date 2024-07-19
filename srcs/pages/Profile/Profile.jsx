import React, { useEffect, useState } from 'react'
import './profile.css'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id';

const Profile = () => {

    const [lineProfile, setLineProfile] = useState(null);

    useEffect(() => {
        LineLogin();
    }, [])

    const LineLogin = async () => {
        // await useLineLogin(Liff_Id.profile);
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log
    }
    return (
        <>
            {lineProfile ? (
                <div className='profileContainer'>
                    <div className='profileBox'>
                        <div className='profileImg'>
                            <img src={lineProfile.picture_url} alt="Profile" />
                        </div>
                        <div className='profiletxt'>
                            <p>{lineProfile.display_name}</p>
                            <p>User ID: {lineProfile.user_id}</p>
                            <p>Status Messeage: {lineProfile.status_messeage}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </>
    )
}

export default Profile