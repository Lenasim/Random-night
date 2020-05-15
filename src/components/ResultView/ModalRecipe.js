import React from 'react'
import Modal from './Modal'

import './Modal.css'

const ModalRecipe = props => {
  return (
    <Modal>
      <div className="modal-top">
        <span className="close" onClick={props.handleClose}>&times;</span>
      </div>
      <div className="modal-body">
        <div className='left'>
          <h2 className='modal-title'>{props.name}</h2>
          <img className='modal-img' src={props.image} alt={props.name} />
          <div className="modal-video">
            <iframe title={props.name}
              src={props.video} frameBorder="0" allow="encrypted-media" allowFullScreen>
            </iframe>
            <p>{console.log(props.video)}</p>
          </div>
        </div>
        <div className='right'>
          <div className='modal-detail'>
            <h3>DETAILED INFO</h3>
            <div className="list-box">
              <h4 className="li-title">Category</h4>
              <p className="list-item">{props.genre}</p>
            </div>
            {props.tags &&
              <div className="list-box">
                <h4 className="li-title">Keywords</h4>
                {props.tags.split(",").map((t, i) => <p key={i} className="list-item">{t}</p>)}
              </div>
            }
            <div className="list-box">
              <h4 className="li-title">Origine</h4>
              <p className="list-item">{props.area}</p>
            </div>
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
            {
              props.instructions.map((instr, index) => (
                <p key={index} className='modal-instr'>{instr}</p>
              ))
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalRecipe