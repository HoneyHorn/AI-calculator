import React, { useState } from "react";
import './wizard.css';
import Slider from './Slider';

export const Step1 = ({ onNext, companyData }) => {
    const [companyName, setCompanyName] = useState(companyData?.companyName || "");
    const [companyDescription, setCompanyDescription] = useState(companyData?.companyDescription || "");
    const [companySphere, setCompanySphere] = useState(companyData?.companySphere || []); // теперь сферы - это массив
    const [sliderEmployeeValue, setEmployeeValue] = useState(companyData?.sliderEmployeeValue || 5000); //Задаем начальное значение

    const handleCompanySphereChange = (event) => { // функция для обработки изменения сферы
        const selectedOptions = Array.from(event.target.options)
          .filter(option => option.selected)
          .map(option => option.value)
        setCompanySphere(selectedOptions);
    };


    const handleSliderEmployeeChange = (event) => {
        setEmployeeValue(event.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onNext({ companyName, companyDescription, companySphere,  sliderEmployeeValue}); // передаем профессию вместе с другими данными
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <div class="widget-container">
                <div class='input-group'>
                    <label>Название компании:</label>
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>

                <div class='input-group'>
                    <label>Короткое описание деятельности:</label>
                    <input type="text" value={companyDescription} onChange={e => setCompanyDescription(e.target.value)} />
                </div>

                <div class='input-group'>
                    <label>Сфера деятельности компании:</label>
                    <select value={companySphere} onChange={handleCompanySphereChange} multiple>
                    <option value="IT">Информационные технологии и программное обеспечение</option>
                    <option value="Finance">Финансовые услуги и банковское дело</option>
                    <option value="Manufacturing">Производство и инженерия</option>
                    <option value="Healthcare">Здравоохранение и медицина</option>
                    <option value="Retail">Розничная торговля и торговля оптом</option>
                    <option value="Automotive">Автомобильная промышленность</option>
                    <option value="Telecom">Телекоммуникации и связь</option>
                    <option value="Travel">Путешествия и туризм</option>
                    <option value="Education">Образование и образовательные услуги</option>
                    <option value="Energy">Энергетика и производство энергии</option>
                    <option value="Media">Развлечения и медиа</option>
                    <option value="RealEstate">Недвижимость и строительство</option>
                    <option value="FoodBeverage">Производство пищевых продуктов и напитков</option>
                    <option value="Logistics">Логистика и транспорт</option>
                    <option value="LegalServices">Юридические и правовые услуги</option>
                    <option value="Environment">Охрана окружающей среды и устойчивое развитие</option>
                    <option value="Advertising">Реклама и маркетинг</option>
                    <option value="Entertainment">Искусство и развлечения</option>
                    <option value="Consulting">Консалтинг и управленческие услуги</option>
                    <option value="Agriculture">Сельское хозяйство и сельское развитие</option>
                    </select>
                </div>

                <div class="input-group">
                    <Slider min={50} max={20000} step={50} initialValue={sliderEmployeeValue} label={"Количество сотрудников:"} onChange={handleSliderEmployeeChange}/>
                </div>
                
                <button type="submit">Далее</button>
            </div>
        </form>
    );
}