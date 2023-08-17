import React, { useState } from "react";
import RadioButtonComponent from './RadioButtonComponent';
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';

export const Step3 = ({ onNext, questinonOne, onBack }) => {
  const [answerOneValue, setAnswerOneValue] = useState('');
  const [fieldsChecked, setEnableButton] = useState(true)

  function checkFields() {
    if (!document.querySelector('input[name="answers"]:checked')){
        return true;
    }
    return false;
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    onNext( "Вопро №2" ); // передаем профессию вместе с другими данными
  };

  const handleRadioChange = (event) => {
    console.log("Выбранное значение:", event.target.value);
    setAnswerOneValue(event.target.value);
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
      <div class="title">
            <p>Вопрос от GPT с выбором ответа</p>
        </div>
        <div class="gpt-question">
          {/* <p>{questinonOne}</p>  */}
          <p>Захардоженный текст. Здесть будет распологаться вопрос от GPT</p>
        </div>
        <div class="answer">
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
