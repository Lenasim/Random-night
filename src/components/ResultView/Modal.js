import React from 'react'

import './Modal.css'

function Modal(props) {


    return (
        <div className="modal-content">
            <div className="modal-top">
                <span className="close" onClick={props.handleClose}>&times;</span>
            </div>
            <div className="modal-body">
                {props.ingredients ?
                    <>
                        <div className='left'>
                            <h2 className='modal-title'>{props.name}</h2>
                            <img className='modal-img' src={props.image} alt={props.name} />
                            <iframe className='modal-video' title={props.name}
                                src={props.video} frameBorder="0" allow="encrypted-media" allowFullScreen>
                            </iframe>
                        </div>
                        <div className='right'>
                            <div className='modal-types'>
                                <p>{props.genre}</p>
                                <hr />
                                {
                                    props.alcoholic ?
                                        props.alcoholic === "Alcoholic" ?
                                            <p>Alcoolisé</p>
                                            : <p>Sans alcool</p>
                                        : <p>{props.tags}</p>
                                }
                                <hr />
                                <p>{props.glassType}{props.area}</p>
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
                    </>
                    :
                    <>
                        <div className='left'>
                            <h2 className='modal-title'>{props.name}</h2>
                            <img className='modal-img' src={props.image} alt={props.name} />
                        </div>
                        <div className='right'>
                            <div className='modal-types'>
                                <div>
                                    <p className="li-title">Genres :</p>
                                    <ul className="modal-lists">
                                        {
                                            props.genre.map((g, i) => (
                                                <li key={i}>{g}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <hr />
                                <div>
                                    <p className="li-title">Date de sortie : </p>
                                    <p>{props.date}</p>
                                </div>
                                <hr />
                                <div>
                                    <p className="li-title">Note : </p>
                                    <p>{props.rating} / 10</p>
                                </div>
                            </div>
                            <div className='modal-detail'>
                                <h3>STAFF</h3>
                                <div className="modal-group-list">
                                    <ul className="modal-lists">
                                        <li className="li-title">Acteurs principaux :</li>
                                        <li>{props.actors[0]}</li>
                                        <li>{props.actors[1]}</li>
                                        <li>{props.actors[2]}</li>
                                    </ul>
                                    <ul className="modal-lists">
                                        <li className="li-title">Réalisateur(s) :</li>
                                        {
                                            props.directors.map((d, i) =>
                                                <li key={i}>{d}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='modal-detail'>
                                <h3>SYNOPSIS</h3>
                                <p>{props.overview}</p>
                            </div>
                            {
                                props.trailer &&
                                <div className='modal-detail'>
                                    <h3>TRAILER</h3>
                                    {
                                        props.show &&
                                        <iframe className='modal-video' title={props.name}
                                            src={props.trailer} frameBorder="0" allow="encrypted-media" allowFullScreen>
                                        </iframe>
                                    }
                                </div>
                            }

                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Modal