import React from 'react'
import Modal from './Modal'

import './Modal.css'

const ModalMovie = props => {
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
          {props.trailer &&
            <div className='modal-detail'>
              <h3>TRAILER</h3>
              <div className="modal-video">
                <iframe title={props.name} src={props.trailer} width="100%" height="100%" frameBorder="0" allow="encrypted-media" allowFullScreen>
                </iframe>
              </div>
            </div>
          }
          <div className='modal-detail'>
            <h3>MOVIE INFO</h3>
            <div className="list-box">
              <h4 className="li-title">Genres</h4>
              {props.genre.map((g, i) => (
                <p className="list-item" key={i}>{g}</p>
              ))}
            </div>
            <div className="list-box">
              <h4 className="li-title">Release Date</h4>
              <p className="list-item">{props.date}</p>
            </div>
            <div className="list-box">
              <h4 className="li-title">Rating</h4>
              <p className="list-item">{props.rating} / 10</p>
            </div>
            <div className="list-box">
              <h4 className="li-title">Director(s)</h4>
              <p className="list-item">{props.directors.map(d => d)}</p>
            </div>
            <div className="list-box">
              <h4 className="li-title">Main Casting</h4>
              <p className="list-item">{props.actors[0]}</p>
              <p className="list-item">{props.actors[1]}</p>
              <p className="list-item">{props.actors[2]}</p>
            </div>
          </div>
          <div className='modal-detail'>
            <h3>SYNOPSIS</h3>
            <p>{props.overview}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalMovie