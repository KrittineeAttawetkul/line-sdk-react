import React from 'react';
import './button.css';

const Button = (props) => {
    const { text, disabled, onClick } = props;

    return (
        <button
            className={`Btn ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            onClick={onClick} // Add onClick handler
        >
            {text}
        </button>
    );
};

export default Button;
