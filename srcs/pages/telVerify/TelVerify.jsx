import React, { useEffect, useState } from 'react'
import './telVerify.css'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';
import Button from '../../components/Button/Button'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'


const TelVerify = () => {
    const [tel, setTel] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState(null);

    const [lineProfile, setLineProfile] = useState(null);
    const [userList, setUserList] = useState({
        display_name: '',
        picture_url: '',
        status_message: '',
        qr_url: ''
    });

    useEffect(() => {
        pageInit();
    }, [])

    const pageInit = async () => {
        await useLineLogin(Liff_Id.tel);
        userInit();
    }

    // ****function addon 
    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log

        const payload = { //ส่งเป็น obj
            user_id: profile.user_id
        }
    }

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
                            <p>{response}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TelVerify