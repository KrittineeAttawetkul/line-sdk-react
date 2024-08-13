import React, { useState } from 'react'
import { USER_ACTION } from '../../apis/userApi'

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tel</label>
                </div>
                <input
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
        </>
    )
}

export default TelVerify