import React, { useState } from 'react'
import './verify.css'
import Button from '../../components/Button/Button'
import VerifyCard from './VerifyCard/VerifyCard'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';

const Verify = () => {

  const [isTransferDone, setisTransferDone] = useState(false);

  const location = useLocation();
  const { comment } = location.state || {};

  const popup = () => {
    Swal.fire({
      title: "โอนคะแนนสำเร็จ",
      text: "คุณมียอดคงเหลือ 658 point",
      icon: "success",
      confirmButtonText: 'เรียบร้อย',
      confirmButtonColor: "#DE2D1E",
      width: 375
    }).then(() => {
      setisTransferDone(true);
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
            <VerifyCard comment={comment} />
          </div>
          <div className={`verifyBtn ${isTransferDone ? 'disabled' : ''}`} onClick={isTransferDone ? null : popup} >
            <Button text={isTransferDone ? 'ทำรายการแล้ว' : 'ยืนยัน'} disabled={isTransferDone} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Verify