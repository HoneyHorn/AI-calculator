import React, { useEffect, useRef, useState } from "react";
import './wizard.css';
import { Range, getTrackBackground } from "react-range";
import { ReactComponent as MySvg } from '../images/icon.svg';
import BlueCircles from "./BlueCircles";

export const Step1 = ({ onNext, companyData, onBack, filledStates, setFilledStates }) => {
    const [companyName, setCompanyName] = useState(companyData?.companyName || "");
    const [companyDescription, setCompanyDescription] = useState(companyData?.companyDescription || "");
    const [companySphere, setCompanySphere] = useState(companyData?.companySphere || []); // теперь сферы - это массив
    const [sliderEmployeeValue, setEmployeeValue] = useState(companyData?.sliderEmployeeValue || 0); //Задаем начальное значение
    const [currLength, setCurrCompayInfo] = useState(0);
    const [sliderState, setSliderState] = useState(companyData?.sliderEmployeeValue || [0]);
    const [fieldsChecked, setEnableButton] = useState(true);

    const spheresShow = [
        {id: 'IT', name: 'IT'},
        {id: 'RealEstate', name: 'Недвижимость'},
        {id: 'Advertising', name: 'Маркетинг'},
    ]
    
    const spheresSearch = [
        {id: 'Healthcare', name: 'Медицина'},
        {id: 'Finance', name: 'Финансы'},
        {id: 'Manufacturing', name: 'Производство'},
        {id: 'Retail', name: 'Торговля'},
        {id: 'Automotive', name: 'Авто'},
        {id: 'Telecom', name: 'Связь'},
        {id: 'Travel', name: 'Туризм'},
        {id: 'Education', name: 'Образование'},
        {id: 'Energy', name: 'Энергетика'},
        {id: 'Media', name: 'Медиа'},
        {id: 'FoodBeverage', name: 'Продукты питания'},
        {id: 'Logistics', name: 'Логистика'},
        {id: 'LegalServices', name: 'Юридические услуги'},
        {id: 'Environment', name: 'Охрана окружающей среды'},
        {id: 'Entertainment', name: 'Искусство'},
        {id: 'Consulting', name: 'Консалтинг'},
        {id: 'Agriculture', name: 'Сельское хозяйство'},
    ];

    const handleCompanySphereChange = (event) => { // функция для обработки изменения сферы
        const selectedOptions = Array.from(event.target.options)
          .filter(option => option.selected)
          .map(option => option.value)
        setCompanySphere(selectedOptions);
        if (document.getElementById("another") !== 'Другое')
            document.getElementById("another").checked = true;
        else document.getElementById("another").checked = false;
        setEnableButton(checkFields());
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFilledStates(setCurrentState());
        onNext({ companyName, companyDescription, companySphere,  sliderEmployeeValue});
    };

    function setCurrentState() {
        const changedState = filledStates;
        changedState[0] = 1;
        return changedState;
      }

    const limitCnt = 100;

    function checkFields() {
        if (document.getElementById("companyName").value.length === 0){
            return true;
        }
        if (document.getElementById("companyInfo").value.length === 0){
            return true;
        }
        if (sliderState[0] === 0){
            return true;
        }
        if (!document.querySelector('input[name="sphere"]:checked')){
            return true;
        }
        return false;
    }

    function changeCompanyInfo(event) {
        setCompanyDescription(event.target.value);
        const length = event.target.value.length;
        setCurrCompayInfo(length);
        setEnableButton(checkFields());
    }

    function changeCompanyName(event){
        setCompanyName(event.target.value);
        setEnableButton(checkFields());
    }

    useEffect(() => {
        setEnableButton(checkFields());
    }, [sliderState]);
    
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
                    <p>Введите информацию о компании</p>
                </div>

                {/* Название компании */}
                <div class='input-group'>
                    <label>Название компании</label>
                    <input id="companyName" type="text" value={companyName} onChange={e => changeCompanyName(e)} placeholder="Ввести"/>
                </div>

                {/* Описание компании */}
                <div class='input-group'>
                    <label id="cal">Короткое описание деятельности</label>
                    <textarea 
                        type="text" 
                        value={companyDescription} 
                        onChange={e => changeCompanyInfo(e)} 
                        placeholder="Ввести"
                        id="companyInfo"
                        maxlength={limitCnt}
                    />
                    <div class="companyInfoLength">
                        <span id="currLength">{currLength}</span>
                        <span>/</span>
                        <span id="limitLength">{limitCnt}</span>
                    </div>
                </div>

                {/* Сфера деятельности */}
                <div class="input-group">
                    <label>Выберите сферу деятельности</label>
                    <div class="showSpheres">
                        {spheresShow.map((sphere) => (
                            <><input type="radio" name="sphere" value={sphere.id} id={sphere.id} 
                            onChange={() => {
                                    setCompanySphere(document.querySelector('input[name="sphere"]:checked').value);
                                    setEnableButton(checkFields());
                                }
                            }/>
                            <label class="sphereOption" for={sphere.id}>
                                {sphere.name}
                            </label></>
                        ))}
                        <input type="radio" name="sphere" value="another" id="another"/>
                        <label class="sphereOption" for="another">
                            <select onClick={handleCompanySphereChange}>
                                <option value="" disabled selected hidden>Другое</option>
                                {spheresSearch.map((sphere) => (
                                    <option value={sphere.id}>{sphere.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                
                {/* Количество сотрудников */}
                <div class="input-group">
                    <label>Выберите количество сотрудников</label>
                    {/* <ReactRange id="empsCnt"/> */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        margin: "2em",
                        alignItems: "center"
                        }}
                    >
                    <span>{0}</span>
                    <Range
                        values={sliderState}
                        step={1}
                        min={0}
                        max={1000}
                        onChange={(values) => {
                            setSliderState(values);
                            setEmployeeValue(values[0])
                        }
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
                    <span>{1000}</span>
                    </div>
                </div>
                
                {/* Переходы к следующему и предыдущиму шагам */}
                <div class="navSection">
                    <button type="button" onClick={onBack}>&larr; &nbsp; Назад</button>
                    <button id="next" type="submit" disabled={fieldsChecked}>Далее &nbsp; &rarr;</button>
                </div>
            </div>
        </form>
    );
}