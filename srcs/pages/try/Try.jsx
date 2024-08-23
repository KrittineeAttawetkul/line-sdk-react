import liff from '@line/liff'
import Liff_Id from '../../assets/Liff_Id'

import React, { useEffect, useState } from 'react'

const Try = () => {
    const [liffStatus, setLiffStatus] = useState('Initializing LIFF...');
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const initializeLiff = async () => {
        try {
            await liff.init({ liffId: Liff_Id.try }); // Use your own LIFF ID
            if (liff.isInClient()) {
                await liff.ready;
                if (liff.scanCodeV2) {
                    const result = await liff.scanCodeV2();
                    console.log('Scan result:', result);
                    setScanResult(result.value);
                    alert('Scan complete');
                } else {
                    console.error('scanCodeV2 is not supported on this device');
                    alert('scanCodeV2 is not supported on this device');
                }
            } else {
                console.warn('This function should be used within the LINE app.');
                alert('Please use this feature within the LINE app.');
            }
            setLiffStatus('LIFF Initialized');
        } catch (error) {
            console.error('LIFF initialization failed', error);
            setLiffStatus('LIFF initialization failed');
            alert('LIFF initialization failed');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeLiff();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>{liffStatus}</div>
                    <div className='word'>Ver 23.10</div>
                    <div className='word'>No endpoint page</div>
                    {scanResult && (
                        <div className='scan-result'>
                            <strong>Scan Result:</strong> {scanResult}
                        </div>
                    )}
                </>
            )}
        </>
    )
}


export default Try;
