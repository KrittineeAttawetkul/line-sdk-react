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
                        ไปยัง
                        line Profile
                    </div>
                    <div >
                        <form className='transferForm'>
                            <div>
                                <label>จำนวนคะแนน</label>
                            </div>
                            <div>
                                <input placeholder='จำนวนคะแนน'></input>
                            </div>
                            <div>
                                <label>เหตุผลการให้คะแนน*</label>
                            </div>
                            <div>
                                <input placeholder='comment'></input>
                            </div>
                        </form>
                    </div>
                    <div>
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