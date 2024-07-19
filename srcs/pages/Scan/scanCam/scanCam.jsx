import React, { useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import './scancam.css'



const ScanCam = () => {

    useEffect(() => {
        console.log(navigator.userAgent)
        pageInit();
    }, [])

    const pageInit = async () => {
        await permissionChecker();
    }
    const permissionChecker = () => {
        return new Promise(async (resolve, reject) => {
            let userAgent = navigator.userAgent.toLocaleLowerCase();
            let pattern = /android/;

            if (!!navigator.permissions) {
                resolve();
            } else {
                if (pattern.test(userAgent)) {
                    let currentURL = location.href;
                    location.href = `${currentURL}/?openExternalBrowser=1`
                }
            }
        })
    }

    const handleQrReader = (result, error) => {

        if (!!result) {
            console.log('result')
            location.href = `${result}`

        }
        if (!!error) {
            console.info(error);
        }
    }

    return (
        <div className="scanCam_container">
            <div className="cam">
                <QrReader
                    onResult={handleQrReader}
                    constraints={{ facingMode: 'environment', aspectRatio: { ideal: 1 } }}
                    containerStyle={{ width: 300, height: 300 }}
                    videoStyle={{ width: '100%', height: '100%', borderRadius: 15 }}
                />
            </div>
        </div>
    )
}

export default ScanCam