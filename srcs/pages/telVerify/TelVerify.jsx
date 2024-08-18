import React, { useState } from 'react'
import { USER_ACTION } from '../../apis/userApi'
import './telVerify.css'
import Button from '../../components/Button/Button'


const TelVerify = () => {
    const [tel, setTel] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const payload = { //ส่งเป็น obj
                tel: tel
            }

            const res = await USER_ACTION.checkTel(payload);
            console.log('user res: ', res);
            console.log('res Data: ', res.data);
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <div className='telContainter'>
                <div className='telBox'>
                    <p>Security Sign In</p>
                    <form onSubmit={handleSubmit} className='telForm'>
                        <div className='telLabel'>
                            <label>เบอร์โทรศัพท์มือถือ</label>
                            <span>*</span>
                        </div>
                        <div>
                            <input
                                type="tel"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                placeholder='เบอร์โทรศัพท์มือถือ'
                                required
                            />
                        </div>
                        <div type="submit" className='telBtn'>
                            <Button text='ยืนยัน' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TelVerify