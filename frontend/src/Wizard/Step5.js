import React, { useState } from "react";
import './wizard.css';

export const Step5 = ({ onBack, reportValue }) => {
    const handleSubmit = e => {
        e.preventDefault();
        // onNext({ answerTwoValue }); // передаем профессию вместе с другими данными
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <div class="widget-container">
                <p>{ reportValue.report }</p>
                <button type="button" onClick={onBack}>Назад</button>
            </div>
        </form>
    );
}