
import style from "./Button.module.scss"

const Button = (props) => {
  const buttonClass = `${style.button} ${style[props.styletype]} ${props.active ? style.active : ''} ${props.disabled ? style.disabled : ''}`;

    return (
      <>
       <button className={buttonClass} onClick={props.onClick}  disabled={props.disabled}>
      {props.btn}
    </button>
      </>
    ); 
  }
  
  
  export default Button;