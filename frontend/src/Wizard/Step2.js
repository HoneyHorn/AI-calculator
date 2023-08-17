import React, { useState, useEffect } from "react";
import Slider from './Slider';
import './wizard.css';
import { Range, getTrackBackground } from "react-range";
import { ReactComponent as MySvg } from '../images/icon.svg';

export const Step2 = ({ onNext, professionData, onBack }) => {
  const [slidersProfessionValues, setSlidersProfessionValues] = useState(professionData);
  const [salaryFrontend, setSalaryFrontend] = useState("");
  const [salaryBackend, setSalaryBackend] = useState("");
  const [sliderStateFront, setSliderStateFront] = useState([0]);
  const [sliderStateBack, setSliderStateBack] = useState([0]);
  const [fieldsChecked, setEnableButton] = useState(true);
  const [sumEmps, setSumEmps] = useState(true);

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

  function checkFields() {
    if (document.getElementById("salaryFrontend").value.length === 0){
        return true;
    }
    else if (isNaN(document.getElementById("salaryFrontend").value)){
      return true;
    }
    if (document.getElementById("salaryBackend").value.length === 0){
        return true;
    }
    else if (isNaN(document.getElementById("salaryBackend").value)){
      return true;
    }
    if (sliderStateFront[0] === 0) {
      return true;
    }
    if (sliderStateBack[0] === 0) {
      return true;
    }
    return false;
  }

  function changeSalaryFront(event){
    setSalaryFrontend(event.target.value);
    setEnableButton(checkFields());
  }

  function changeSalaryBack(event){
    setSalaryBackend(event.target.value);
    setEnableButton(checkFields());
  }

  function limitCnt() {
    if (sliderStateFront[0] + sliderStateBack[0] > 100){
      if (sliderStateFront[0] > 50){
        setSliderStateBack([100 - sliderStateFront[0]]);
      }
      if (sliderStateBack[0] > 50){
        setSliderStateFront([100 - sliderStateBack[0]]);
      }
    }
  }

  useEffect(() => {
    limitCnt();
    setEnableButton(checkFields());
  }, [sliderStateFront]);

  useEffect(() => {
    limitCnt();
    setEnableButton(checkFields());
  }, [sliderStateBack]);

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
            <p>Распределите сотрудников по профессиям</p>
        </div>

        <div class="input-group-name">
          Frontend-разработчики
        </div>
        <div class="input-2-cols">
        {/* Количество Frontend-разработчиков */}
        <div class="input-group">
          <label>Количество</label>
          {/* <ReactRange id="empsCnt"/> */}
          <div
              style={{
              display: "flex",
              justifyContent: "space-between",
              // flexWrap: "wrap",
              marginTop: "1em",
              alignItems: "center",
              width: "80%"
              }}
          >
          <span>0%</span>
          <Range
              values={sliderStateFront}
              step={1}
              min={0}
              max={100}
              onChange={(values) => {setSliderStateFront(values)}
              }
              renderTrack={({ props, children }) => (
              <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '75%'
                  }}
              >
                  <div
                  ref={props.ref}
                  style={{
                      height: '5px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                      values: sliderStateFront,
                      colors: ['#506cff', '#ccc'],
                      min: 0,
                      max: 100,
                      }),
                      alignSelf: 'center'
                  }}
                  >
                  {children}
                  </div>
              </div>
              )}
              renderThumb={({ props, isDragged }) => (
              <div
                  {...props}
                  style={{
                  ...props.style,
                  height: '18px',
                  width: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 6px #AAA',
                  border: 'solid',
                  borderColor: '#506cff',
                  outline: 'none'
                  }}
              >
                  <div
                  style={{
                      position: 'absolute',
                      top: '-28px',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                      padding: '4px',
                      borderRadius: '4px',
                      backgroundColor: '#506cff'
                  }}
                  >
                  {sliderStateFront[0]}
                  </div>
                  <div
                  style={{
                      height: '5px',
                      width: '5px',
                      backgroundColor: 'white'
                  }}
                  />
              </div>
              )}
          />
          <span>100%</span>
          </div>
        </div>
        <div class='input-group'>
            <label>Средняя заработная плата</label>
            <input id="salaryFrontend" type="text" value={salaryFrontend} onChange={e => changeSalaryFront(e)} placeholder="Ввести"/>
        </div>
        </div>

        <div class="input-group-name">
          Backend-разработчики
        </div>
        <div class="input-2-cols">
        {/* Количество Frontend-разработчиков */}
        <div class="input-group">
          <label>Количество</label>
          <div
              style={{
              display: "flex",
              justifyContent: "space-between",
              // flexWrap: "wrap",
              marginTop: "1em",
              alignItems: "center",
              width: "80%"
              }}
          >
          <span>0%</span>
          <Range
              values={sliderStateBack}
              step={1}
              min={0}
              max={100}
              onChange={(values) => {setSliderStateBack(values)}
              }
              renderTrack={({ props, children }) => (
              <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '75%'
                  }}
              >
                  <div
                  ref={props.ref}
                  style={{
                      height: '5px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                      values: sliderStateBack,
                      colors: ['#506cff', '#ccc'],
                      min: 0,
                      max: 100,
                      }),
                      alignSelf: 'center'
                  }}
                  >
                  {children}
                  </div>
              </div>
              )}
              renderThumb={({ props, isDragged }) => (
              <div
                  {...props}
                  style={{
                  ...props.style,
                  height: '18px',
                  width: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 6px #AAA',
                  border: 'solid',
                  borderColor: '#506cff',
                  outline: 'none'
                  }}
              >
                  <div
                  style={{
                      position: 'absolute',
                      top: '-28px',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                      padding: '4px',
                      borderRadius: '4px',
                      backgroundColor: '#506cff'
                  }}
                  >
                  {sliderStateBack[0]}
                  </div>
                  <div
                  style={{
                      height: '5px',
                      width: '5px',
                      backgroundColor: 'white'
                  }}
                  />
              </div>
              )}
          />
          <span>100%</span>
          </div>
        </div>
        <div class='input-group'>
            <label>Средняя заработная плата</label>
            <input id="salaryBackend" type="text" value={salaryBackend} onChange={e => changeSalaryBack(e)} placeholder="Ввести"/>
        </div>
        </div>

        {Object.entries(professionData).map(([profession, percentage], index) => (
          <div class="input-group">
            <Slider min={0} max={100} step={1} initialValue={percentage} label={profession} onChange={(e) => handleSliderEmployeeChange(e, profession)}/>
          </div>
        ))}

        {/* Переходы к следующему и предыдущиму шагам */}
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
