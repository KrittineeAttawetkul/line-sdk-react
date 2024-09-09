import React, { useEffect, useState } from 'react';
import './scan.css';
import useLineLogin from '../../utils/addons/useLineLogin';
import Liff_Id from '../../assets/Liff_Id';
import liff from '@line/liff';
import { permissionChecker } from '../../utils/addons/addons';
import { BASE_URL } from '../../config/HostConfig';
import { useNavigate } from 'react-router-dom';
import { POPUP } from '../../components/popUp/PopUP';

const Scan = () => {
    const [lineProfile, setLineProfile] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [scanUserID, setScanUserID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        pageInit();
    }, []);

    const pageInit = async () => {
        console.log("Initializing LINE login for scan page");
        localStorage.removeItem('receiver_id');

        await useLineLogin(Liff_Id.scan);
        userInit();

        try {
            const result = await permissionChecker();
            console.log('Permission checker status:', result.status);

            const scan = result.status ? liff.scanCode : liff.scanCodeV2;
            const scanResult = await scan();
            setScanResult(scanResult.value);

        } catch (error) {
            console.error("Error scanning QR code:", error);
        }
    };

    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Stored profile:', profile);
    };

    useEffect(() => {
        if (scanResult && lineProfile) {
            const isValidQR = scanResult.startsWith('NLCHR-MYQR-');

            if (isValidQR) {
                const receiver_id = scanResult.slice(11);
                console.log('Scanned user ID:', receiver_id);

                if (receiver_id !== lineProfile.user_id) {
                    setScanUserID(receiver_id);

                    navigate(BASE_URL.suburl + "/scan/transfer", { state: { receiver_id } });
                }
                else {

                    POPUP.warningPopUp({
                        title: 'โอ๊ะโอ',
                        text: `คิวอาร์โค้ดนี้ไม่สามารถใช้ได้ โปรดลองใหม่อีกครั้ง`,
                        function: () => {
                            liff.closeWindow();
                        } // Correct way to pass the function
                    })
                }
            } else {

                POPUP.warningPopUp({
                    title: 'โอ๊ะโอ',
                    text: `คิวอาร์โค้ดนี้ไม่สามารถใช้ได้ โปรดลองใหม่อีกครั้ง`,
                    function: () => {
                        liff.closeWindow();
                    } // Correct way to pass the function
                })
            }
        }
    }, [scanResult, lineProfile]);

    return (
        <div>
            <h1>Scan</h1>
            {scanResult && scanUserID ? (
                <>
                    <p>Scan result: {scanResult}</p>
                    <p>Scan userId: {scanUserID}</p>
                </>
            ) : (
                <p>No scan result yet.</p>
            )}
        </div>
    );
};

export default Scan;
