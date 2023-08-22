import React, { useState } from "react";
import RadioButtonComponent from './RadioButtonComponent';
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step4 = ({ onNext, questionTwo, onBack, filledStates, setFilledStates }) => {
  const [answerTwoValue, setAnswerTwoValue] = useState('');
  const [fieldsChecked, setEnableButton] = useState(true);

  function checkFields() {
    if (!document.querySelector('input[name="answers"]:checked')){
        return true;
    }
    return false;
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    setFilledStates(setCurrentStateNext());
    onNext( "Вопро №2" ); // передаем профессию вместе с другими данными
  };

  const handleBack = () => {
    setFilledStates(setCurrentStateBack());
    onBack();
  }

  const handleRadioChange = (event) => {
    console.log("Выбранное значение:", event.target.value);
    setAnswerTwoValue(event.target.value);
  }

  function setCurrentStateNext() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[2] = 0;
    }
    else changedState[2] = 1;
    changedState[3] = 1;
    return changedState;
  }

  function setCurrentStateBack() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[2] = 0;
    }
    else changedState[2] = 1;
    changedState[1] = 1;
    return changedState;
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
      <div class={questionTwo.length === 0 ? "loader-wrapper" : "loader-wrapper-hide"}>
        <div class="loader"></div>
      </div>
        <div class="gpt-question">
          <p>{questionTwo}</p> 
          {/* <p>Захардоженный текст. Здесть будет распологаться вопрос от GPT</p> */}
        </div>
        <div class={questionTwo.length !== 0 ? "answer" : "answer-hide"}>
          <div class="showSpheres">
          <input type="radio" name="answers" value="Да" id="Yes"
            onChange={() => {
                  setAnswerTwoValue(document.querySelector('input[name="answers"]:checked').value);
                  setEnableButton(checkFields());
              }
            }
          />
            <label class="sphereOption" for="Yes">
                Да
            </label>
          <input type="radio" name="answers" value="Нет" id="No"
            onChange={() => {
                setAnswerTwoValue(document.querySelector('input[name="answers"]:checked').value);
                setEnableButton(checkFields());
              }
            }
          />
            <label class="sphereOption" for="No">
                Нет
            </label>
          <input type="radio" name="answers" value="Не знаю" id="Idk"
            onChange={() => {
                setAnswerTwoValue(document.querySelector('input[name="answers"]:checked').value);
                setEnableButton(checkFields());
              }
            }
          />
            <label class="sphereOption" for="Idk">
                Не знаю
            </label>
          </div>
        </div>
        {/* <div>
            <RadioButtonComponent 
                options={["Да", "Нет"]}
                label=""
                onChange={handleRadioChange}
            />
        </div> */}

        <div class="navSection">
          <button type="button" onClick={() => handleBack()}>&larr; &nbsp; Назад</button>
          <div>
            <button id="skip" type="submit">Пропустить вопрос</button>
            <button id="next" type="submit" disabled={fieldsChecked}>Далее &nbsp; &rarr;</button>
          </div>
        </div>
      </div>

    </form>
  );
}
