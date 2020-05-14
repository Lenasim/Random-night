import React from 'react'
import Modal from './Modal'

import './Modal.css'

const ModalCocktail = props => {
  return (
    <Modal>
      <div className="modal-top">
        <span className="close" onClick={props.handleClose}>&times;</span>
      </div>
      <div className="modal-body">
        <div className='left'>
          <h2 className='modal-title'>{props.name}</h2>
          <img className='modal-img' src={props.image} alt={props.name} />
        </div>
        <div className='right'>
          <div className='modal-detail'>
            <h3>DETAILED INFO</h3>
            <div className="list-box">
              <h4 className="li-title">Type of drink</h4>
              <p className="list-item">{props.genre} &</p>
              <p className="list-item">{props.alcoholic}</p>
            </div>
            <div className="list-box">
              <h4 className="li-title">Drinkware</h4>
              <p className="list-item">{props.glassType}</p>
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
            <p>{props.instructions}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCocktail