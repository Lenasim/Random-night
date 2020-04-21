import React from 'react';

function Card(props) {
    return (
        <div className="card-link" onClick={props.onClick} >
            <div className="card">
                <div className="card-details">
                    <h4 className="card-category">{props.categorie}</h4>
                    <h3 className="card-title">{props.name}</h3>
                </div>
                <img className="card-image" src={props.image} alt={props.name} />
            </div>
        </div>
    )
}

export default Card
