import React, { useState } from "react";
import Slider from './Slider';
import './wizard.css';

export const Step2 = ({ onNext, professionData, onBack }) => {
  const [slidersProfessionValues, setSlidersProfessionValues] = useState(professionData);


  const handleSubmit = e => {
    e.preventDefault();
    onNext(professionData); // передаем профессию вместе с другими данными
  };

  const handleSliderEmployeeChange = (event, profession) => {
    // Обновляем соответствующее значение в состоянии
    setSlidersProfessionValues(prevState => ({
      ...prevState,
      [profession]: event.target.value
    }));
  };

  return(
    <form onSubmit={handleSubmit}>
      <div class="widget-container">
        {Object.entries(professionData).map(([profession, percentage], index) => (
          <div class="input-group">
            <Slider min={0} max={100} step={1} initialValue={percentage} label={profession} onChange={(e) => handleSliderEmployeeChange(e, profession)}/>
          </div>
        ))}

        <button type="button" onClick={onBack}>Назад</button>

        <button type="submit">Далее</button>
      </div>
    </form>
  );
}
