import React from 'react'
import './Input.css';
function Input({title, placeholder, name, onChange, type}) {
  return (
    <div className='input_container'>
        <p>{title}*</p>
        <input name={name} onChange={onChange} type={type? type: 'text'} placeholder={placeholder}/>
    </div>
  )
}

export default Input