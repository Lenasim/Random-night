import React from 'react';


export default function Card(props) {

    return (
        <a className="card-link" href="\#">
            <div className="card">
                <img className="card-image" src={props.image} alt={props.name} />
                <div className="card-details">
                    <h4 className="card-category">{props.categorie}</h4>
                    <h3 className="card-title">{props.name}</h3>
                    <button className="card-button">See details</button>
                </div>
            </div>
        </a>
    )
}