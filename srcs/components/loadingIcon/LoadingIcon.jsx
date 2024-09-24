import React from 'react'
import loadingIcon from '../../assets/loadingIcon.gif'
import './loadingIcon.css'

const LoadingIcon = () => {
    return (
        <div className='loadingIconContainer'>
            <img className='loadingIcon' src={loadingIcon} draggable={false} />
        </div>
    )
}

export default LoadingIcon