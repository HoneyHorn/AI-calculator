import React from 'react';
import './wizard.css';

function Step1() {
  return (
    <div class="widget-container">
        <div class="input-group">
            <label for="company_name">Название компании:</label>
            <input type="text" id="company_name"></input>
        </div>

        <div class="input-group">
            <label for="company_description">Короткое описание деятельности:</label>
            <input type="text" id="company_description"></input>
        </div>

        <div class="input-group">
            <label for="company_sphere">Сфера деятельности компании:</label>
            <select id="company_sphere" name="company_sphere" multiple required>
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
            <label for="sliderEmployee">Выберите число сотрудников:</label>
            <input type="range" id="sliderEmployee" name="slider" min="10" max="15000" step="5" value="5000"></input>
            <span id="sliderValueEmployee">5000</span>
        </div>

        <div class="input-group">
            <label for="sliderSalary">Средняя заработная плата в месяц:</label>
            <input type="range" id="sliderSalary" name="slider" min="1000" max="1000000" step="1000" value="50000"></input>
            <span id="sliderValueSalary">50000</span>
        </div>
    </div>
  );
}

export default Step1;