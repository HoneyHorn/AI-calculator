import React, { useState, useEffect } from "react";
import Slider from './Slider';
import './wizard.css';
import { Range, getTrackBackground } from "react-range";
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step2 = ({ onNext, professionData, onBack, filledStates, setFilledStates }) => {
  const [slidersProfessionValues, setSlidersProfessionValues] = useState(professionData);
  const [salaryBackend, setSalaryBackend] = useState([]);
  const [sliderStateFront, setSliderStateFront] = useState([0]);
  const [sliderStateBack, setSliderStateBack] = useState([[0]]);
  const [sliderStateBackStr, setSliderStateBackStr] = useState("");
  const [fieldsChecked, setEnableButton] = useState(true);
  const [sumEmps, setSumEmps] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    setFilledStates(setCurrentStateNext());
    onNext(professionData); // передаем профессию вместе с другими данными
  };

  const handleBack = () => {
    setFilledStates(setCurrentStateBack());
    onBack();
  }

  const handleSliderEmployeeChange = (profession, value, index) => {
    // Обновляем соответствующее значение в состоянии
    const newArr = sliderStateBack;
    const val = value * 1
    newArr[index] = [value * 1];
    // setSliderStateBack(newArr);
    setSlidersProfessionValues(prevState => ({
      ...prevState,
      [profession]: val
    }));
  };

  function checkFields() {
    // if (document.getElementById("salaryFrontend").value.length === 0){
    //     return true;
    // }
    // else if (isNaN(document.getElementById("salaryFrontend").value)){
    //   return true;
    // }
    if (Object.keys(slidersProfessionValues).length === 0)
      return true;
    let salaryFields = (document.getElementsByClassName('salary'));
    for (let el of salaryFields) {
      if (el.value.length === 0)
        return true;
      if (isNaN(el.value))
        return true;
    }
    if (sliderStateBack[0] === 0) {
      return true;
    }
    return false;
  }

  function changeSalaryBack(event, index){
    const newSalary = salaryBackend;
    newSalary[index] = event.target.value;
    setSalaryBackend(newSalary);
    console.log("salaryBack: ", salaryBackend);
    setEnableButton(checkFields());
  }

  function setCurrentStateNext() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[0] = 0;
    }
    else changedState[0] = 1;
    changedState[1] = 1;
    return changedState;
  }

  function setCurrentStateBack() {
    const changedState = filledStates;
    if (checkFields()){
      changedState[0] = 0;
    }
    else changedState[0] = 1;
    return changedState;
  }

  useEffect(() => {
    setEnableButton(checkFields());
  }, [sliderStateFront]);

  useEffect(() => {
    setEnableButton(checkFields());
  }, [sliderStateBack]);

  useEffect(() => {
    console.log('professionData: ', professionData);
    Object.entries(professionData).map(([profession, percentage], index) => {
      handleSliderEmployeeChange(profession, percentage, index);
    })
  }, [professionData])

  useEffect(() => {
    console.log('slidersProfessionValues: ', slidersProfessionValues);
    const newArr = sliderStateBack;
    Object.entries(slidersProfessionValues).map(([profession, percentage], index) => {
      newArr[index] = [percentage * 1];
    })
    setSliderStateBack(newArr);
    console.log('sliderStateBack: ', sliderStateBack);
  }, [slidersProfessionValues])


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
            <p>Распределите сотрудников по профессиям</p>
        </div>
        <div class={Object.keys(slidersProfessionValues).length === 0 ? "loader-wrapper" : "loader-wrapper-hide"}>
          <div class="loader"></div>
        </div>

        {Object.entries(slidersProfessionValues).map(([profession, percentage], index) => (
          <><div class="input-group-name">
            {profession}
          </div><div class="input-group">
              {/* <Slider min={0} max={100} step={1} initialValue={profession} label={profession} onChange={(e) => handleSliderEmployeeChange(e, profession)}/> */}
              <div class="input-2-cols">
                {/* Количество Backend-разработчиков */}
                <div class="input-group">
                  <label>Количество</label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1em",
                      alignItems: "center",
                      width: "80%"
                    }}
                  >
                    <span>0%</span>
                    <Range
                      values={sliderStateBack[index]}
                      step={1}
                      min={0}
                      max={100}
                      onChange={(values) => {
                        // if (sliderStateFront[0] + values[0] > 100){
                        //   setSliderStateFront([100 - values[0]]);
                        // }
                        // setSliderStateBack(values)
                        handleSliderEmployeeChange(profession, values, index);
                      } }
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
                                values: sliderStateBack[index],
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
                            {sliderStateBack[index]}
                          </div>
                          <div
                            style={{
                              height: '5px',
                              width: '5px',
                              backgroundColor: 'white'
                            }} />
                        </div>
                      )} />
                    <span>100%</span>
                  </div>
                </div>
                <div class='input-group'>
                  <label>Средняя заработная плата</label>
                  <input class="salary" id={"salary" + index} type="text" onChange={e => changeSalaryBack(e, index)} placeholder="Ввести" />
                </div>
              </div>
            </div></>
        ))}

        {/* Переходы к следующему и предыдущиму шагам */}
        <div class="navSection">
          <button type="button" onClick={() => {
            handleBack();
          }}>&larr; &nbsp; Назад</button>
          <div>
            <button id="skip" type="submit" >Пропустить вопрос</button>
            <button id="next" type="submit" disabled={fieldsChecked} >Далее &nbsp; &rarr;</button>
          </div>
        </div>
      </div>
    </form>
  );
}
