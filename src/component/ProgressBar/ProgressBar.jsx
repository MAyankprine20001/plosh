// import styles from "./ProgressBar.module.scss"
import "./styleprogress.css"


const ProgressBar = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log("value kya aa rhii ha ", value);
  
  
  
    


  return (
    <div  className="progressbarContainer">
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={handleChange}
        className="horizontal-slider"
        style={{
          background: `linear-gradient(to right, rgba(75, 0, 130, 1) ${
            value * 10
          }%, #ddd ${value * 10}% 100%)`,
        }}
      />
      {/* Display the current value of the slider */}
      <span className="slider-value" > {value}</span>
    </div>
  );
};

export default ProgressBar;
