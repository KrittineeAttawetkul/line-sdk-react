import React from 'react'
import './transfer.css'
import PointCard from './PointCard/PointCard'
import Button from '../../components/Button/Button'

const Transfer = () => {
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
                            ไปยัง
                        </div>
                        <div>
                            <img src='' />
                        </div>
                    </div>
                    <div>
                        <form className='transferForm'>
                            <div>
                                <div>
                                    <label>จำนวนคะแนน</label>
                                </div>
                                <div>
                                    <input className='disInput' placeholder='1 คะแนน' disabled></input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>เหตุผลการให้คะแนน*</label>
                                </div>
                                <div>
                                    <input placeholder='comment'></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='transferBtn'>
                        <a href='#'>
                            <Button text='โอนคะแนน' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transfer