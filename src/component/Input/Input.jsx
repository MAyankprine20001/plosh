import React from 'react';
import style from './Input.module.scss';

const Input = (props) => {
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 32 && e.target.value.trim() !== '') {
  //     e.preventDefault();
  //   }
  // };
  const handleKeyDown = (e) => {
  
    if (e.keyCode === 32) {
        
        if (e.target.value.trim() === '' || /\s\S/.test(e.target.value)) {
            e.preventDefault();
        }
    }
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
          e.preventDefault();
        }
};



  return (
    <>
      <input
        type={props.type}
        className={`${style.input} ${style[props?.styletype]}`}
        name={props.name}
        value={props.value}
        id={props.id}
        onChange={handleChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default Input;
