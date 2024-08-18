import React, { useState } from 'react'
import { USER_ACTION } from '../../apis/userApi'
import './telVerify.css'
import Button from '../../components/Button/Button'


const TelVerify = () => {
    const [tel, setTel] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        setIsSubmitting(true)

        try {

            const payload = { //ส่งเป็น obj
                tel: tel
            }

            const res = await USER_ACTION.checkTel(payload);
            console.log('user res: ', res);
            console.log('res Data: ', res.data);

            setResponse(res.data);
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
                                pattern="[0][0-9]{2}[0-9]{3}[0-9]{4}"
                                required
                            />
                        </div>
                        <div type="submit" className={`telBtn ${isSubmitting ? 'disabled' : ''}`}>
                            <Button text={isSubmitting ? 'ยืนยันแล้ว' : 'ยืนยัน'} disabled={isSubmitting} />
                        </div>
                    </form>
                    {response && (
                        <div className='responseMessage'>
                            <p>Response: {response}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TelVerify