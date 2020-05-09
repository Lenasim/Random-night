import React from 'react';

const Card = props => {
    return (
        <div>
            <div className="card">
                <i onClick={props.isFav} className={props.class}></i>
                <div className="card-details">
                    <h4 className="card-category">{props.category}</h4>
                    <h3 className="card-title"> {props.name}</h3>
                </div>
                <img className="card-image" src={props.image} alt={props.name} onClick={props.onClick} />
            </div>
        </div>
    )
}

export default Card
