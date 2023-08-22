import React, { useState } from "react";
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step5 = ({ onNext, questinonOne, onBack, filledStates, setFilledStates }) => {
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

  function setCurrentStateNext() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[3] = 0;
    }
    else changedState[3] = 1;
    changedState[4] = 1;
    return changedState;
  }

  function setCurrentStateBack() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[3] = 0;
    }
    else changedState[3] = 1;
    changedState[2] = 1;
    return changedState;
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    setFilledStates(setCurrentStateNext());
    onNext( "Вопро №3" ); // передаем профессию вместе с другими данными
  };

  const handleBack = () => {
    setFilledStates(setCurrentStateBack());
    onBack();
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="widget-container">
        <div class="logo">
            <div class="logo-wrapper">
                <MySvg />
                <label>AI-Calculator</label>
            </div>
        </div>
      <BlueCircles filledStates={filledStates} />
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
          <button type="button" onClick={() => {
            handleBack();
          }}>&larr; &nbsp; Назад</button>
          <div>
            <button id="skip" type="submit">Пропустить вопрос</button>
            <button id="next" type="submit" disabled={fieldsChecked}>Далее &nbsp; &rarr;</button>
          </div>
        </div>
      </div>

    </form>
  );
}
