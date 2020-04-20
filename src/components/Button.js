import React from 'react'
import './Button.css'

const Button = ({isClicked, text}) => {
    return (
    <button onClick={isClicked} className='button'>{text}
    </button>
    )
}

export default Button