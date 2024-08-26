import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import Liff_Id from '../../assets/Liff_Id';

const Try = () => {
    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        initializeLiff();
    }, []);

    const initializeLiff = async () => {
        try {
            console.log('Starting LIFF initialization...');
            await liff.init({ liffId: Liff_Id.try });
            console.log('LIFF initialized successfully.');

            if (liff.isLoggedIn()) {
                console.log('User is logged in.');
                if (liff.scanCode) {
                    const result = await liff.scanCodeV2();
                    console.log('Scan result:', result);
                    setRes(result.value);
                } else {
                    console.log('Scan code feature is not available.');
                    setError('Scan code feature not available.');
                }
            } else {
                console.log('User is not logged in. Redirecting to login...');
                liff.login();
            }
        } catch (error) {
            console.error('LIFF initialization error:', error);
            setError(`Failed to initialize LIFF: ${error.message || 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className='word'>Ver 23.10</div>
            <div className='word'>No endpoint page</div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className='errorMessage'>{error}</div>
            ) : res && (
                <div className='responseMessage'>
                    <p>{res}</p>
                </div>
            )}
        </>
    );
};

export default Try;
