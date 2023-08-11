import React, { useState } from 'react';
import axios from 'axios';
import { Step1 } from "./Step1";
import { Step2 } from './Step2';
import { Step3 } from './Step3';

function Wizard() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState(null)
  const [professionData, setProfessionData] = useState({})
  const [questinonOne, setQuestinonOne] = useState('')
  const [questinonTwo, setQuestinonTwo] = useState('')

  const handleCompanyNext = companyData => {
    setCompanyData(companyData); // Сохраняем информацию о компании
    axios.post('http://localhost:5000/guess_profession', companyData)
      .then(response => {
        setProfessionData(response.data); // Получаем список профессий и записываем состояние
      })
      .catch(error => {
        console.error('Error while sending data to server: ', error);
      });
    
    setStep(2); // Переходим на новый шаг
  };

  const handleProfessionNext = professionData => {
    axios.post('http://localhost:5000/questions_generate', {companyData, professionData})
      .then(response => {
        const data = response.data
        setQuestinonOne(data['first_question'])
        setQuestinonTwo(data['second_question'])
      })
      .catch(error => {
        console.error('Error while sending data to server: ', error);
    });

    setStep(3); // Переходим на новый шаг
  };

  const handleBack = () => {
    if(step === 2) setStep(1);
    if(step === 3) setStep(2);
    
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleCompanyNext} companyData={companyData} />}
      {step === 2 && <Step2 onBack={handleBack} onNext={handleProfessionNext} professionData={professionData} />}
      {step === 3 && <Step3 onBack={handleBack} questinonOne={questinonOne}/>}
      {/* {step === 2 && <Step2 onNext={handleAddressNext} address={address} onBack={handleBack} />} */}
      {/* {step === 3 && <SummaryDisplay user={user} address={address} onBack={handleBack} />} */}
    </div>
  );

}

export default Wizard;