import React, { useState } from "react";
import Slider from './Slider';

export const Step2 = ({ onNext, professionData, onBack }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // onNext({  }); // передаем профессию вместе с другими данными
  };

  const handleSliderEmployeeChange = (event) => {
    // setEmployeeValue(event.target.value);
  };

  return(
    <form onSubmit={handleSubmit}>
      {Object.entries(professionData).map(([profession, percentage], index) => (
        <div class="input-group">
          <Slider min={0} max={100} step={1} initialValue={percentage} label={profession} onChange={handleSliderEmployeeChange}/>
        </div>
      ))}

      <button type="button" onClick={onBack}>Back</button>

      <button type="submit">Next</button>
    </form>
  );
}
