import styled from 'styled-components';
import React from 'react';

function Input({ title, placeholder, name, onChange, type, options, className, defaultValue}) {
  return (
    <StyledInput className={className}>
      <p>{title}</p>
      {type === 'text' ? (
        <input name={name} defaultValue={defaultValue}  onChange={onChange} type="text" placeholder={placeholder} />
      ) : type === 'textarea' ? (
        <textarea defaultValue={defaultValue} name={name} onChange={onChange} />
      ) : type === 'file'?(
        <input  name={name}  onChange={(e)=>onChange(e.target.files[0])} accept="image/*" type="file" placeholder={placeholder} />
      ) 
      : type === 'radio' ?  <select name={name} onBlur={onChange} value={defaultValue}>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select> : <input name={name} defaultValue={defaultValue}  onChange={onChange} type={type} placeholder={placeholder} />}
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

  input, textarea, select{
    height: 2.5rem;
    width: 35rem;
    border: 1px solid lightgray;
    padding: 0px 5px;
  }
input:focus{
  border: 2px solid lightgreen;
  outline: none;
}
textarea:focus{
  border: 2px solid lightgreen;
  outline: none;
}
select:focus{
  border: 2px solid lightgreen;
  outline: none;
}
  textarea {
    height: 7rem;
    width: 35rem;
  }
  option{
    height: 5rem;
    background-color: lightgray;
    font-size: 15px
  }
  select{
    
  }
`;


export default Input;
