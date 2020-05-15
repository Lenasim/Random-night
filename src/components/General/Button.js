import React from 'react'

import './Button.css'

const Button = ({ isClicked, text, loader, classButton }) => {
  return (
    <button onClick={isClicked} className={classButton}>
      {loader && <i className="fa fa-pulse fa-spinner"></i>}
      {!loader && text}
      <span></span><span></span><span></span><span></span>
    </button>
  )
}

export default Button