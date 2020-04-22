import React from 'react'
// import React, { Fragment } from 'react'
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
                            <h2>Imperial Cocktail</h2>
                        </section>
                        <img className='modal-img' src="https://www.thecocktaildb.com/images/media/drink/bcsj2e1487603625.jpg" alt="" />
                    </div>

                    <div className='right'>
                        {/* {props.genres
                            ? <div className='modal-detail'>
                            <h3>GENRES</h3>
                            <ul className="modal-lists">
                                <li>action</li>
                                <li>drama</li>
                                <li>S.F.</li>
                            </ul>
                        </div>
                            : <Fragment />
                        } */}
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
                            <p>
                                Shake with ice and strain into cocktail glass.
                        </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal