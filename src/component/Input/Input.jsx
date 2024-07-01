
import React, { useState, useEffect } from 'react';
import style from './Input.module.scss';

const Input = (props) => {
  const [originalType, setOriginalType] = useState(props.type);

  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleKeyDown = (e) => {
    const fieldValue = e.target.value;
    if ((props.type === 'password' || originalType === 'password') && e.target.selectionStart === 0 && e.keyCode === 32) {
      // Prevent spaces in password fields initially
      e.preventDefault();
    } else if ((props.type === 'password' || originalType === 'password') && fieldValue.trim().length > 0 && e.keyCode === 32) {
      // Prevent spaces after the first character in password fields
      e.preventDefault();
    } else if ((props.type === 'text' || originalType === 'text' || props.type === 'email' || props.type === 'text' || props.type === 'tel' || props.type === 'name') && fieldValue.trim().length === 0 && e.keyCode === 32) {
      // Allow spaces after the first character in specific fields
      e.preventDefault();
    } else if ((props.type === 'text' || originalType === 'text') && fieldValue.trim().length > 0 && e.keyCode === 32) {
      // Prevent spaces in text fields after the first character
      e.preventDefault();
    }
  };

  useEffect(() => {
    setOriginalType(props.type);
  }, [props.type]);

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
        // Add autoComplete="off" to prevent browsers from suggesting passwords
        // autoComplete={props.type === 'password' ? 'new-password' : 'off'}
        // Add spellCheck="false" to prevent some browsers from auto-correcting
        // spellCheck={props.type === 'password' ? false : true}
        // Add pattern="\S*" to prevent spaces in text fields
        pattern={props.type === 'text' || props.type === 'fullname' ? '\\S*' : undefined}
      />
    </>
  );
};

export default Input;






// import React from 'react';
// import style from './Input.module.scss';
// import { useState , useEffect } from 'react';
// const Input = (props) => {
 
//   const [originalType, setOriginalType] = useState(props.type);
//   const [isPassword, setIsPassword] = useState(props.type === 'password');
  

//   const handleChange = (e) => {
//     if (props.onChange) {
//       props.onChange(e);
//     }
//   };

//   // const handleKeyDown = (e) => {
//   //   if (e.keyCode === 32 && e.target.value.trim() !== '') {
//   //     e.preventDefault();
//   //   }
//   // };
//   useEffect(() => {
//     setOriginalType(props.type);
//     setIsPassword(props.type === 'password');
//   }, [props.type]);

//   const handleKeyDown = (e) => {
  
//     if (e.keyCode === 32) {
        
//         if (e.target.value.trim() === '' || /\s\S/.test(e.target.value)) {
//             e.preventDefault();
//         }
//     }

    
//     // if (e.keyCode === 32 && e.target.value.trim() !== '') {
//     //       e.preventDefault();
//     //     }
//     // if (props.type === 'password' ||  props.type === "text") {
//     //   console.log("second space" , props.type)
//     //   if (e.keyCode === 32 && e.target.value.trim() !== '') {
//     //     e.preventDefault();
//     //   }
//     // }
//     if (e.keyCode === 32 && e.target.value.trim() !== '') {
//       e.preventDefault();
//     }
// };



//   return (
//     <>
//       <input
//         type={props.type}
//         className={`${style.input} ${style[props?.styletype]}`}
//         name={props.name}
//         value={props.value}
//         id={props.id}
//         onChange={handleChange}
//         onBlur={props.onBlur}
//         placeholder={props.placeholder}
//         onKeyDown={handleKeyDown}
//       />
//     </>
//   );
// };

// export default Input;