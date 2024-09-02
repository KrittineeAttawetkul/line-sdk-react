import React, { useEffect, useState } from 'react';
import './scan.css';
import useLineLogin from '../../utils/addons/useLineLogin';
import Liff_Id from '../../assets/Liff_Id';
import liff from '@line/liff';
import { permissionChecker } from '../../utils/addons/addons';
import Swal from 'sweetalert2'
import { BASE_URL } from '../../config/HostConfig';

const Scan = () => {
    const [lineProfile, setLineProfile] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [scanUserID, setScanUserID] = useState(null);

    useEffect(() => {
        pageInit();
    }, []);

    const pageInit = async () => {
        console.log("Initializing LINE login for scan page");
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

    const handleInvalidQRCode = (message) => {
        console.log(message);
        Swal.fire({
            title: message,
            icon: "warning",
            confirmButtonText: 'ปิด',
            confirmButtonColor: "#C7C7C7",
            width: 350
        }).then(() => {
            liff.closeWindow();
        });
    };

    useEffect(() => {
        if (scanResult && lineProfile) {
            const isValidQR = scanResult.startsWith('NLCHR-MYQR-');

            if (isValidQR) {
                const user_id = scanResult.slice(11);
                console.log('Scanned user ID:', user_id);

                if (user_id !== lineProfile.user_id) {
                    setScanUserID(user_id);
                    location.replace("https://www.podsland.com/nilecon-hr/scan/transfer");
                    // liff.openWindow({
                    //     url: "https://liff.line.me/2006140913-kJo9OWDW",
                    //     external: false,
                    // });
                } else {
                    handleInvalidQRCode('Owner user ID detected.');
                }
            } else {
                handleInvalidQRCode('Not a valid Nilecon QR code. Closing window.');
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
