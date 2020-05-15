import React from 'react';

const Card = props => {
  return (
    <div className="center">
      <div className="property-card">
        {
          props.poster ?
            <img className='poster' src={props.poster} alt={props.name} onClick={props.onClick} />
            :
            <img className='property-image' src={props.image} alt={props.name} onClick={props.onClick} />
        }
        <div className="property-description">
          <h4 className="card-category">{props.category}</h4>
          <h3 className="card-title">{props.name}</h3>
        </div>
        <div className="property-social-icons">
          <i onClick={props.isFav} className={props.class}></i>
        </div>
      </div>
    </div>
  )
}

export default Card
