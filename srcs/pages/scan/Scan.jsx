import React, { useEffect, useState } from 'react';
import './scan.css';
import useLineLogin from '../../utils/addons/useLineLogin';
import Liff_Id from '../../assets/Liff_Id';
import liff from '@line/liff';
import { USER_ACTION } from '../../apis/userApi';
import { BASE_URL } from '../../config/HostConfig';
import { permissionChecker } from '../../utils/addons/addons';

const Scan = () => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        pageInit();
    }, []);

    const pageInit = async () => {

        console.log("scan page useLineLogin");
        await useLineLogin(Liff_Id.scan)
        // userInit();
        try {
            await permissionChecker()
                .then((result) => {
                    console.log('permissionChecker status', result.status)
                    if (result.status) {
                        //-------ver 1-------
                        if (liff.scanCode) {
                            liff.scanCode().then((result) => {
                                // location.replace(result.value);
                                setScanResult(result.value);
                            });
                        }
                    }
                    else {
                        //-------ver 2-------
                        console.log("scan page scanCodeV2");

                        liff.scanCodeV2()
                            .then((result) => {
                                // location.replace(result.value);
                                setScanResult(result.value);
                            })
                            .catch((error) => {
                                console.log("scanCodeV2 error", error);
                            });
                    }
                }).catch((err) => {
                    console.log(err)
                });
        } catch (error) {
            console.error("Error scanning QR code:", error);
        }
    };

    return (
        <div>
            <h1>Scan</h1>
            {scanResult ? (
                <p>Scan result: {scanResult}</p>
            ) : (
                <p>No scan result yet.</p>
            )}
        </div>
    );
};

export default Scan;
