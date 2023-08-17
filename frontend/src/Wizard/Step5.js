import React, { useState } from "react";
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';

export const Step5 = ({ onNext, questinonOne, onBack }) => {
  const [answerThreeValue, setAnswerThreeValue] = useState('');
  const [fieldsChecked, setEnableButton] = useState(true)

  function checkFields() {
    if (document.getElementById("answer-imput").value.length === 0){
        return true;
    }
    return false;
  }

  function changeAnswer(event){
    setAnswerThreeValue(event.target.value);
    setEnableButton(checkFields());
}
  
  const handleSubmit = e => {
    e.preventDefault();
    onNext( "Вопро №3" ); // передаем профессию вместе с другими данными
  };

  return(
    <form onSubmit={handleSubmit}>
      <div class="widget-container">
        <div class="logo">
            <div class="logo-wrapper">
                <MySvg />
                <label>AI-Calculator</label>
            </div>
        </div>
      <div class="title">
            <p>Вопрос от GPT с выбором ответа</p>
        </div>
        <div class="gpt-question">
          {/* <p>{questinonOne}</p>  */}
          <p>Захардоженный текст. Здесть будет распологаться вопрос от GPT</p>
        </div>
        <div class="answer">
            <input id="answer-imput" type="text" value={answerThreeValue} onChange={e => changeAnswer(e)} placeholder="Ввести"/>
        </div>

        <div class="navSection">
          <button type="button" onClick={onBack}>&larr; &nbsp; Назад</button>
          <div>
            <button id="skip" type="submit">Пропустить вопрос</button>
            <button id="next" type="submit" disabled={fieldsChecked}>Далее &nbsp; &rarr;</button>
          </div>
        </div>
      </div>

    </form>
  );
}
