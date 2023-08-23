import React, { useState } from "react";
import './wizard.css';
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step6 = ({ onNext, companyData, professionData, reportValue, answerOne, answerTwo, questionOne, questionTwo, filledStates, setFilledStates }) => {
  const [answerThreeValue, setAnswerThreeValue] = useState('');
  const [fieldsChecked, setEnableButton] = useState(true);

  console.log("RV: ", reportValue);

  function checkFields() {
    if (document.getElementById("answer-imput").value.length === 0){
        return true;
    }
    return false;
  }

  function setCurrentStateNext() {
    const changedState = [0, 0, 0, 0];
    return changedState;
  }

  function changeAnswer(event){
    setAnswerThreeValue(event.target.value);
    setEnableButton(checkFields());
}
  
  const handleSubmit = e => {
    e.preventDefault();
    setFilledStates(setCurrentStateNext());
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
      <BlueCircles filledStates={filledStates} />
        <div class="title">
            <p>Поздравляем с прохожднием тестирования!</p>
        </div>
        <div class={questionOne?.length === 0 || questionTwo?.length === 0 || (questionOne?.length !== 0 && questionTwo?.length !== 0 && reportValue?.length === 0) ? "loader-wrapper" : "loader-wrapper-hide"}>
            <div class="loader"></div>
        </div>
        <div class={questionOne?.length !== 0 && questionTwo?.length !== 0 && reportValue?.length !== 0 ? "result" : "result-hide"}>
            <div class="left-bars">
                <div class="info">
                    <h3>Название компании</h3>
                    <p>{companyData.companyName}</p>
                </div>
                <div class="info">
                    <h3>Краткое описание компании</h3>
                    <p>{companyData.companyDescription}</p>
                </div>
                <div class="info">
                    <h3>Количество сотрудников</h3>
                    <p>{companyData.sliderEmployeeValue}</p>
                </div>
                <div class="info">
                    <h3>Распределение сотрудников</h3>
                    {Object.entries(professionData).map(([key, value]) => (
                        <p>{key}: {Math.round(companyData.sliderEmployeeValue / 100 * professionData[key])} чел</p>
                    ))}
                    {/* <p>{professionData}</p> */}
                </div>
                <div class="info">
                    <h3>{questionOne}</h3>
                    <p>{answerOne}</p>
                </div>
                <div class="info">
                    <h3>{questionTwo}</h3>
                    <p>{answerTwo}</p>
                </div>
            </div>
            <div class="right-bars">
                <div class="result-main">
                    <h3>Результат</h3>
                    <p>Здесь будет результат</p>
                </div>
                <div class="info" id="analysis">
                    <h3>Анализ</h3>
                    <p>{reportValue["report"]}</p>
                </div>
            </div>
        </div>
        
        <div class={questionOne?.length !== 0 && questionTwo?.length !== 0 && reportValue?.length !== 0 ? "pdf-bar" : "pdf-bar-hide"}>
            <label>Можете скачать отчет в PDF и получить результаты письмом на электронную почту</label>
            <div class="pdf-bar-buttons">
                <button type="button" id="download" onClick={() => console.log("downloaded")}>Скачать</button>
                <input type="text" placeholder="exapmple@gmail.com"></input>
                <button type="button" id="send-email" onClick={() => console.log("sended")}>Отправить</button>
            </div>
        </div>

        <label id="bottom-text">Расчеты AI-Calculator приблизительные: для точного планирования внедрения AI в ваш бизнес необходимо обратиться к менеджеру</label>
        <div class="repeat-bar">
            <button id="repeat-test" type="submit" > Пройти тест еще раз</button>
        </div>       
      </div>

    </form>
  );
}
