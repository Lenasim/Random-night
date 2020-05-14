import React from 'react'

import './Modal.css'

const ModalBack = (props) => {
  return (
    <div className="modal" onClick={props.handleClose}>
    </div>
  )
}

export default ModalBack