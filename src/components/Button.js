import React from 'react'
import './Button.css'

const Button = ({isClicked, text}) => {
  return (
    <button onClick={isClicked} className='button'>
        <svg width="370px" height="60px" viewBox="0 0 370 60" class="border">
          <polyline points="369,1 369,59 1,59 1,1 369,1" class="bg-line" />
          <polyline points="369,1 369,59 1,59 1,1 369,1" class="hl-line" />
        </svg>
    <span>{text}</span>
    
    </button>
    )
}

export default Button