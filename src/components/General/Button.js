import React from 'react'

import './Button.css'

const Button = ({ isClicked, text, loader }) => {
  return (
    <button onClick={isClicked} className='button'>
      {loader && <i className="fa fa-pulse fa-spinner"></i>}
      {!loader && text}
      <span></span><span></span><span></span><span></span>
    </button>
  )
}

export default Button