import React, { useState, useEffect } from "react";
import './wizard.css';
import { Range, getTrackBackground } from "react-range";
import { ReactComponent as MySvg } from '../images/icon.svg';

export const Step4 = ({onNext, questinonTwo, onBack}) => {
    const [answerTwoValue, setAnswerTwoValue] = useState('');
    const [fieldsChecked, setEnableButton] = useState(true)
    const [sliderState, setSliderState] = useState([0])

    function checkFields() {
      if (sliderState[0] === 0){
        return true;
      }
      return false;
    }

    useEffect(() => {
        setEnableButton(checkFields());
    }, [sliderState]);
    
    const handleSubmit = e => {
      e.preventDefault();
      onNext("Вопрос №4"); // передаем профессию вместе с другими данными
    };

    return (
        <form onSubmit={handleSubmit}>
      <div class="widget-container">
        <div class="logo">
            <div class="logo-wrapper">
                <MySvg />
                <label>AI-Calculator</label>
            </div>
        </div>
      <div class="title">
            <p>Вопрос от GPT со слайдером</p>
        </div>
        <div class="gpt-question">
          {/* <p>{questinonOne}</p>  */}
          <p>Захардоженный текст. Здесть будет распологаться вопрос от GPT</p>
        </div>
        <div class="answer">
            <Range
                values={sliderState}
                step={1}
                min={0}
                max={1000}
                onChange={(values) => {setSliderState(values)}
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
                        values: sliderState,
                        colors: ['#506cff', '#ccc'],
                        min: 0,
                        max: 1000,
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
                    {sliderState[0]}
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