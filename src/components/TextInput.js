import styled from 'styled-components';
import React from 'react';

function Input({ title, placeholder, name, onChange, type, options }) {
  return (
    <StyledInput>
      <p>{title}*</p>
      {type === 'text' ? (
        <input name={name} required onChange={onChange} type="text" placeholder={placeholder} />
      ) : type === 'textarea' ? (
        <textarea />
      ) : type === 'file'?(
        <input name={name} required onChange={onChange} type="file" placeholder={placeholder} />
      ) 
      : type === 'radio' ? <select>
        <option>{options[0]}</option>
        <option>{options[1]}</option>
      </select> : null}
    </StyledInput>
  );
}

const StyledInput = styled.div`
  width: 70%;
  margin: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 700;
  }

  input{
    height: 2.5rem;
    width: 35rem;
  }

  textarea {
    height: 7rem;
    width: 35rem;
  }
  select{
    height: 2.5rem;
    width: 35rem;
  }
`;


export default Input;
