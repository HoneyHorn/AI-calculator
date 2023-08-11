import React, { useState } from "react";
import RadioButtonComponent from './RadioButtonComponent';
import './wizard.css';

export const Step3 = ({ onNext, questinonOne, onBack }) => {
  const [answerOneValue, setAnswerOneValue] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    // onNext({ slidersProfessionValues }); // передаем профессию вместе с другими данными
  };

  const handleRadioChange = (event) => {
    console.log("Выбранное значение:", event.target.value);
    setAnswerOneValue(event.target.value);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="widget-container">
        <p>{questinonOne}</p> 

        <div>
            <RadioButtonComponent 
                options={["Да", "Нет"]}
                label=""
                onChange={handleRadioChange}
            />
        </div>

        <button type="button" onClick={onBack}>Назад</button>
        <button type="button" onClick={onBack}>Пропустить вопрос</button>
        <button type="submit">Далее</button>
      </div>

    </form>
  );
}
