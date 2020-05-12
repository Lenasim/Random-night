import React from 'react'
import Modal from './Modal'

import './Modal.css'

function ModalRecipe(props) {


    return (
        <Modal>
            <div className="modal-top">
                <span className="close" onClick={props.handleClose}>&times;</span>
            </div>
            <div className="modal-body">
                <div className='left'>
                    <h2 className='modal-title'>{props.name}</h2>
                    <img className='modal-img' src={props.image} alt={props.name} />
                    <iframe className='modal-video' title={props.name}
                        src={props.video} frameBorder="0" allow="encrypted-media" allowFullScreen>
                    </iframe>
                </div>
                <div className='right'>
                    <div className='modal-types'>
                        <p className="tag">{props.genre}</p>
                        {props.tags &&
                            props.tags.split(",").map((t, i)=> <p key={i} className="tag">{t}</p>)
                        }
                        <p className="tag">{props.area}</p>
                    </div>
                    <div className='modal-detail'>
                        <h3>INGREDIENTS</h3>
                        <div className="modal-group-list">
                            <ul className="modal-lists">
                                {
                                    props.ingredients.map((ing, i) => (
                                        <li key={i}>{ing}</li>
                                    ))
                                }
                            </ul>
                            <ul className="modal-lists">
                                {
                                    props.measures.map((meas, i) => (
                                        <li key={i}>{meas}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='modal-detail'>
                        <h3>HOW TO MAKE</h3>
                        <p>{props.instructions}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalRecipe