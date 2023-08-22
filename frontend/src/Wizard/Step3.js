import React, { useState } from "react";
import RadioButtonComponent from './RadioButtonComponent';
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step3 = ({ onNext, questionOne, onBack, filledStates, setFilledStates }) => {
  const [answerOneValue, setAnswerOneValue] = useState('');
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
    onNext( document.querySelector('input[name="answers"]:checked').value ); // передаем профессию вместе с другими данными
  };

  const handleBack = () => {
    setFilledStates(setCurrentStateBack());
    onBack();
  }

  const handleRadioChange = (event) => {
    console.log("Выбранное значение:", event.target.value);
    setAnswerOneValue(event.target.value);
  }

  function setCurrentStateNext() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[1] = 0;
    }
    else changedState[1] = 1;
    changedState[2] = 1;
    return changedState;
  }

  function setCurrentStateBack() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[1] = 0;
    }
    else changedState[1] = 1;
    changedState[0] = 1;
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
      <div class={questionOne.length === 0 ? "loader-wrapper" : "loader-wrapper-hide"}>
        <div class="loader"></div>
      </div>
        <div class="gpt-question">
          <p>{questionOne}</p> 
          {/* <p>Захардоженный текст. Здесть будет распологаться вопрос от GPT</p> */}
        </div>
        <div class={questionOne.length !== 0 ? "answer" : "answer-hide"}>
          <div class="showSpheres">
          <input type="radio" name="answers" value="Да" id="Yes"
            onChange={() => {
                  setAnswerOneValue(document.querySelector('input[name="answers"]:checked').value);
                  setEnableButton(checkFields());
              }
            }
          />
            <label class="sphereOption" for="Yes">
                Да
            </label>
          <input type="radio" name="answers" value="Нет" id="No"
            onChange={() => {
                setAnswerOneValue(document.querySelector('input[name="answers"]:checked').value);
                setEnableButton(checkFields());
              }
            }
          />
            <label class="sphereOption" for="No">
                Нет
            </label>
          <input type="radio" name="answers" value="Не знаю" id="Idk"
            onChange={() => {
                setAnswerOneValue(document.querySelector('input[name="answers"]:checked').value);
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
