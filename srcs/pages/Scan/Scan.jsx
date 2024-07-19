import React from 'react'
import './scan.css'
import ScanCam from './scanCam/scanCam'

const Scan = () => {
    return (
        <>
            <div className='scanContainer'>
                <div className='scanBox'>
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