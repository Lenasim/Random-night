import React from 'react'
import './Modal.css'

function Modal(props) {
    const changeClassName = props.show ?
        "modal" : "display-none"

    return (
        <div>
            <div className={changeClassName}>
                <div className="modal-details">
                <span className="close" onClick={props.handleClose}>&times;</span>
                    <h1>Modal is here</h1>
                </div>
            </div>
        </div>
    )
}

export default Modal