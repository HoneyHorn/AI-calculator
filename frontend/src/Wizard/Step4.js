import React, { useState } from "react";
import RadioButtonComponent from './RadioButtonComponent';
import './wizard.css';

export const Step4 = ({ onNext, questinonTwoValue, onBack }) => {
  const [answerTwoValue, setAnswerTwoValue] = useState('Да');
  
  const handleSubmit = e => {
    e.preventDefault();
    onNext({ answerTwoValue }); // передаем профессию вместе с другими данными
  };

  const handleRadioChange = (event) => {
    setAnswerTwoValue(event.target.value);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="widget-container">
        <p>{questinonTwoValue}</p> 

        <div>
            <RadioButtonComponent 
                options={["Да", "Нет"]}
                label=""
                onChange={handleRadioChange}
            />
        </div>

        <button type="button" onClick={onBack}>Назад</button>
        <button type="submit">Далее</button>
      </div>

    </form>
  );
}
