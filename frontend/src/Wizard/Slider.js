import React, { useState } from 'react';

function Slider({ min, max, step, initialValue, label, onChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event); // Вызываем переданный обработчик onChange с тем же событием
  };

  return (
    <div>
        <label>{label}</label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
        />
        <span>{value}</span>
    </div>
  );
}

export default Slider;
