import React, { useState } from 'react'
import './transfer.css'
import PointCard from './PointCard/PointCard'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleTransfer = () => {
        navigate('/api/scan/transfer/verify', { state: { comment } });
    };

    return (
        <>
            <div className='transferContainer'>
                <div className='transferBox'>
                    <div className='transferTitle'>
                        โอนคะแนน
                    </div>
                    <div>
                        <PointCard />
                    </div>
                    <div className='receiverProfile'>
                        <div>
                            ไปยัง :
                        </div>
                        <div>
                            <img src='' />
                        </div>
                    </div>
                    <div>
                        <form className='transferForm'>
                            <div className='inputBox'>
                                <div>
                                    <label>จำนวนคะแนน</label>
                                </div>
                                <div>
                                    <input className='disInput' placeholder='1 คะแนน' disabled></input>
                                </div>
                            </div>
                            <div className='inputBox'>
                                <div>
                                    <label>เหตุผลการให้คะแนน*</label>
                                </div>
                                <div>
                                    <textarea
                                        placeholder='comment'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='transferBtn'>
                        <a href='http://localhost:5173/api/scan/transfer/verify' onClick={handleTransfer}>
                            <Button text='โอนคะแนน' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transfer