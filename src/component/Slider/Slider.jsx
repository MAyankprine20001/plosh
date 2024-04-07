import React, { useState } from 'react';
import styles from './Slider.module.scss';

const Slider = () => {
  const [value, setValue] = useState(5);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const progressWidth = `${(value-1) * 10 }%`; 

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        className={styles.slider}
        onChange={handleChange}
      />
      <div className={styles.progress} style={{ width: progressWidth }}></div> 
      <div style={{marginLeft:"10px" , fontSize:"18px"}}>{value}</div>
    </div>
  );
};

export default Slider;