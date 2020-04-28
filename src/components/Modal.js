import React from 'react'

import './Modal.css'

function Modal(props) {
    const changeClassName = props.show ?
        "modal" : "display-none"

    return (
        <div className={changeClassName}>
            <div className="modal-content">
                <div className="modal-top">
                    <span className="close" onClick={props.handleClose}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className='left'>
                        <section className='modal-title'>
                            <h2>{props.name}</h2>
                        </section>
                        <img className='modal-img' src={props.image} alt="" />
                    </div>
                    <div className='right'>
                        <div>
                            <p>{props.genre}</p>
                            <p>{props.alcoholic}</p>
                            <p>{props.glassType}</p>
                            <p>{props.date}</p>
                            <p>{props.rating}</p>
                        </div>
                        <div className='modal-detail'>
                            <h3>INGREDIENTS</h3>
                            <ul className="modal-lists">
                                <li>1 oz  Vodka</li>
                                <li>1 1/2 oz Baileys irish cream</li>
                                <li>1/2 oz Kahlua</li>
                            </ul>
                        </div>
                        <section className='modal-detail'>
                            <h3>HOW TO MAKE</h3>
                            <p>{props.instructions}</p>
                            <p>{props.overview}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal