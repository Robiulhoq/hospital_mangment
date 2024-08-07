import React from "react";
import styled from "styled-components";

function Input({
  title,
  placeholder,
  name,
  onChange,
  type,
  options,
  className,
  defaultValue,
  required,
  value,
}) {
  return (
    <StyledInput className={className}>
      <p>{title}</p>
      {type === "text" ? (
        <input
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          type="text"
          required={required}
          placeholder={placeholder}
        />
      ) : type === "textarea" ? (
        <textarea
          required={required}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
        />
      ) : type === "file" ? (
        <input
          name={name}
          onChange={(e) => onChange(e.target.files[0])}
          accept="image/*"
          type="file"
          placeholder={placeholder}
        />
      ) : type === "radio" ? (
        <select
          name={name}
          required={required}
          onChange={onChange}
          value={defaultValue}
        >
          <option>Select</option>
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      )}
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
  input {
    width: 35rem;
  }
  textarea {
    width: 35rem;
    height: 7rem;
  }
  select {
    width: 35rem;
  }
  input,
  textarea,
  select {
    height: 2.5rem;
    border: 1px solid lightgray;
    padding: 0px 5px;
  }
  input:focus {
    border: 2px solid lightgreen;
    outline: none;
  }
  textarea:focus {
    border: 2px solid lightgreen;
    outline: none;
  }
  select:focus {
    border: 2px solid lightgreen;
    outline: none;
  }

  option {
    height: 5rem;
    background-color: lightgray;
    font-size: 15px;
  }
  @media only screen and (max-width: 1024px) {
    width: 90%;
    input {
      width: 30rem;
    }
    textarea {
      width: 30rem;
      height: 7rem;
    }
    select {
      width: 30rem;
    }
  }
`;

export default Input;
