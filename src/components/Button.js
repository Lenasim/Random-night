import React from 'react'
import './Button.css'

const Button = ({ random }) => {
    return (<button onClick={random} className='button'>Laisse-toi faire !</button>)
}

export default Button