import React, { useState } from 'react';

function RadioButtonComponent({ options, label, onChange }) {
    // Допустим, options - это массив из двух элементов: ['Да', 'Нет']
    const [selectedValue, setSelectedValue] = useState(options[0]);
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event); // Вызываем переданный обработчик onChange с тем же событием
    };

    return (
    <div>
        <label>{label}</label>
        <div>
            {options.map(option => (
                <label key={option}>
                    <input
                        type="radio"
                        name="customRadioButton" // Используем одно и то же имя, чтобы группировать радиокнопки
                        value={option}
                        checked={selectedValue === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
        {/* Дополнительно отображать, какой вариант выбран */}
        {/* <span>Выбрано: {selectedValue}</span>  */}
    </div>
    );
}

export default RadioButtonComponent;