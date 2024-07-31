import React from 'react'
import './button.css'

const Button = (props) => {

    const { text, disabled } = props;

    return (
        <>
            <button className={`Btn ${disabled ? 'disabled' : ''}`} disabled={disabled}>
                {text}
            </button>
        </>
    )
}

export default Button