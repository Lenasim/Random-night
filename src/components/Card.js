import React from 'react';

function Card(props) {
    return (
        <div>
            <div className="card"  >
                <i onClick={props.isFav} className={props.class}></i>
                <div className="card-details">
                    <h4 className="card-category">{props.categorie}</h4>
                    <h3 className="card-title"> {props.name}</h3>
                </div>
                <img className="card-image" src={props.image} alt={props.name} />
                <div onClick={props.onClick} className="more">
                    <span className="plus">+</span>
                </div>
            </div>
        </div>
    )
}

export default Card
