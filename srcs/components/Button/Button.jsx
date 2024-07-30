import React from 'react'
import './button.css'

const Button = (props) => {
    return (
        <>
            <button className='Btn'>
                {props.text}
            </button>
        </>
    )
}

export default Button