import React, { useEffect, useState } from 'react'
import './telVerify.css'
import { USER_ACTION } from '../../apis/userApi'
import { BASE_URL } from '../../config/HostConfig';
import Button from '../../components/Button/Button'
import useLineLogin from '../../utils/addons/useLineLogin'
import Liff_Id from '../../assets/Liff_Id'
import Swal from 'sweetalert2'


const TelVerify = () => {
    const [tel, setTel] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState(null);
    const [lineProfile, setLineProfile] = useState(null);

    useEffect(() => {
        pageInit();
    }, [])

    const popup = (status, data) => {
        console.log("status", status)

        if (status) {
            if (data == 'User already exists') {
                Swal.fire({
                    title: 'เข้าสู่ระบบ',
                    // text: "",
                    icon: "success",
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: "#29AE4C",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });
            }
            if (data == 'Success save record') {
                Swal.fire({
                    title: 'สมัครสมาชิกสำเร็จ',
                    // text: "",
                    icon: "success",
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: "#29AE4C",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });
            }
        }
        else {
            if (data == 'Different user') {
                Swal.fire({
                    title: 'มีผู้ใช้งานนี้แล้ว',
                    // text: "",
                    icon: "warning",
                    confirmButtonText: 'ปิด',
                    confirmButtonColor: "#C7C7C7",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });
            }
            else if (data == 'คุณไม่ได้เป็นพนักงาน Nilecon') {
                Swal.fire({
                    title: 'คุณไม่ได้เป็นพนักงาน Nilecon',
                    // text: "",
                    icon: "warning",
                    confirmButtonText: 'ปิด',
                    confirmButtonColor: "#C7C7C7",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });
            }
            else if (data == 'Failed to save record') {
                Swal.fire({
                    title: 'สมัครสมาชิกไม่สำเร็จ',
                    // text: "",
                    icon: "error",
                    confirmButtonText: 'ปิด',
                    confirmButtonColor: "#C7C7C7",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });
            }
            else {
                Swal.fire({
                    title: 'เกิดปัญหาขัดข้อง',
                    // text: "",
                    icon: "error",
                    confirmButtonText: 'ปิด',
                    confirmButtonColor: "#C7C7C7",
                    width: 350
                }).then(() => {
                    setIsSubmitting(true);
                });

            }
        }
    }

    const pageInit = async () => {
        console.log('liff id: ', Liff_Id.tel);

        const local = await useLineLogin(Liff_Id.tel);
        console.log('local', local)
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
                    <p>Security Sign In</p>
                    <p>Ver 23.15</p>
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
                        <div type="submit" className={`telBtn ${isSubmitting ? 'disabled' : ''}`} >
                            <Button text={isSubmitting ? 'ยืนยันแล้ว' : 'ยืนยัน'} disabled={isSubmitting} />
                        </div>
                    </form>
                    {/* {response && (
                        <div className='responseMessage'>
                            <p>{response}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    )
}

export default TelVerify