import React, { useEffect, useState } from 'react'
import './telVerify.css'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';
import Button from '../../components/Button/Button'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import { POPUP } from '../../components/popUp/PopUP';
import loadingIcon from '../../assets/loadingIcon.gif';

const TelVerify = () => {
    const [tel, setTel] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState(null);
    const [lineProfile, setLineProfile] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        pageInit();
    }, [])

    const popup = (status, data) => {
        console.log("status", status)

        if (status) {
            if (data == 'User already exists') {

                POPUP.successPopUp({
                    title: 'เข้าสู่ระบบ',
                    text: 'คุณได้เข้าสู่ระบบสำเร็จ',
                    function: () => {
                        setIsSubmitting(true);
                        setLoading(false)
                        liff.closeWindow();
                    } // Correct way to pass the function
                })
            }

            if (data == 'Success save record') {

                POPUP.successPopUp({
                    title: 'สมัครสมาชิกสำเร็จ',
                    text: 'คุณได้สมัครสมาชิกสำเร็จ',
                    function: () => {
                        setIsSubmitting(true);
                        setLoading(false)
                        liff.closeWindow();
                    } // Correct way to pass the function
                })
            }
        }
        else {
            const titleMessages = {
                'Different user': 'โอ้ว..ไม่นะ',
                'คุณไม่ได้เป็นพนักงาน Nilecon': 'โอ้ว..ไม่นะ',
                'Failed to save record': 'เข้าสู่ระบบไม่สำเร็จ',
                default: 'เกิดปัญหาขัดข้อง',
            };
            const errorMessages = {
                'Different user': 'มีชื่อผู้ใช้งานนี้แล้ว',
                'คุณไม่ได้เป็นพนักงาน Nilecon': 'คุณไม่ได้เป็นพนักงาน Nilecon',
                'Failed to save record': 'ชื่อผู้ใช้หรือรหัสไม่ถูกต้อง ลองอีกครั้ง',
                default: 'เกิดปัญหาขัดข้อง ลองอีกครั้ง',
            };

            POPUP.errorPopUp({
                title: titleMessages[data] || errorMessages.default,
                text: errorMessages[data] || errorMessages.default,
                function: () => {
                    setIsSubmitting(true);
                    setLoading(false)
                    liff.closeWindow();
                } // Correct way to pass the function
            });
        }
    }

    const pageInit = async () => {
        // console.log('liff id: ', Liff_Id.tel);
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (isSubmitting) return
        // setIsSubmitting(true)

        try {

            const payload = { //ส่งเป็น obj
                tel: tel,
                user_id: lineProfile.user_id
            }

            setLoading(true)

            const res = await USER_ACTION.Register(payload);
            console.log('user res: ', res);
            console.log('res Data: ', res.data);


            popup(res.status, res.data)

            setResponse(res.data);

        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <div className='telContainter'>
                <div className='telBox'>
                    <div className='t1'>ยินดีตอนรับ!</div>
                    <div className='t2'>กรุณากรอกหมายเลขโทรศัพท์มือถือของท่านเพื่อเข้าสู่ระบบ</div>
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
                        <div type="submit" className={`telBtn ${loading ? 'disabled' : ''}`} >
                            <Button text={loading ? 'กำลังดำเนินการ...' : 'ยืนยัน'} disabled={loading} />
                        </div>
                    </form>
                </div>
                {loading && (
                    <div className="loadingContainer">
                        <img src={loadingIcon} alt="Loading..." className="loadingIcon" />
                    </div>
                )}
            </div>
        </>
    )
}

export default TelVerify