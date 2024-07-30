import React from 'react'
import './verify.css'
import Button from '../../components/Button/Button'
import VerifyCard from './VerifyCard/VerifyCard'
import Swal from 'sweetalert2'

const Verify = () => {
  const popup = () => {
    Swal.fire({
      title: "โอนคะแนนสำเร็จ",
      text: "คุณมียอดคงเหลือ 658 point",
      icon: "success",
      confirmButtonText: 'เรียบร้อย',
      confirmButtonColor: "#DE2D1E"
    });
  }
  return (
    <>
      <div className='verifyContainer'>
        <div className='verifyBox'>
          <div className='verifyTitle'>
            โอนคะแนนไปยัง
          </div>
          <div>
            img
          </div>
          <div>
            line name
          </div>
          <div>
            <VerifyCard />
          </div>
          <div className='verifyBtn' onClick={popup}>
            <Button text='ยืนยัน' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Verify