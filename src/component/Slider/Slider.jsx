// import React, { useState } from 'react';
// import styles from './Slider.module.scss';

// const Slider = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   // const progressWidth = `${(value-1) * 10 }%`; 
//   const progressWidth = `${(value / 10) * 90}%`;

//     // const progressWidth = `${(value * 10)}%`;


//   // const progressWidth = `${(value / 10) * 100}%`;


//   return (
//     <div className={styles.sliderContainer}>
//       <input
//         type="range"
//         min="0"
//         max="10"
//         value={value}
//         className={styles.slider}
//         onChange={handleChange}
//       />
//       <div className={styles.progress} style={{ width: progressWidth }}></div> 
//       <div className={styles.valuesection} >{value}</div>
//     </div>
//   );
// };

// export default Slider;



// : new slider



import React, { useState } from "react";
import "./styles.css";

const Slider = () => {
  const [sliderValue, setSliderValue] = useState(0); // State variable to track the current value of the slider

  // Event handler for when the slider value changes
  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
    // setValue(event.target.value)
  };

  return (
    <div className="sliderContainer">
      <input
        type="range"
        min={0}
        max={10}
        value={sliderValue}
        onChange={handleSliderChange}
        className="horizontal-slider"
        style={{
          background: `linear-gradient(to right, rgba(75, 0, 130, 1) ${
            sliderValue * 10
          }%, #ffffff ${sliderValue * 10}% 100%)`,
        }}
      />
      {/* Display the current value of the slider */}
      <span className="slider-value"> {sliderValue}</span>
    </div>
  );
};

export default Slider;


