import React, { useEffect, useState } from 'react'
import './scan.css'
import ScanCam from './scanCam/scanCam'
import useLineLogin from '../../utils/addons/useLineLogin';
import Liff_Id from '../../assets/Liff_Id';

const Scan = () => {

    const [lineProfile, setLineProfile] = useState(null);

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        await useLineLogin(Liff_Id.scan);
        userInit();
    }

    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log
    }

    return (
        <>
            <div className='scanContainer'>
                <div className='scanBox'>
                    <div>
                        {lineProfile ? (
                            <div>
                                {lineProfile.display_name}
                            </div>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                    </div>
                    <div>
                        <ScanCam />
                    </div>
                    <div>
                        <a href='#'>
                            <button className='scanBtn'>
                                My QR
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Scan