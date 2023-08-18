import React, { useState } from 'react';
import axios from 'axios';
import { Step1 } from "./Step1";
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';
import { Step6 } from './Step6';

function Wizard() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState(null)
  const [professionData, setProfessionData] = useState({})
  const [questinonOne, setQuestinonOne] = useState('')
  const [questinonTwo, setQuestinonTwo] = useState('')
  const [filledStates, setFilledStates] = useState([0, 0, 0, 0, 0])

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

  const secondQuestion = questinonTwo => {
    setStep(4);
  }

  const thirdQuestion = questinonThree => {
    setStep(5);
  }

  const results = data => {
    setStep(6);
  }

  const start = startData => {
    setStep(1);
  }

  const handleBack = () => {
    if(step === 2)
      setStep(1);
    if(step === 3)
      setStep(2);
    if(step === 4)
      setStep(3);
    if(step === 5)
      setStep(4);
    if(step === 6)
      setStep(5);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleCompanyNext} companyData={companyData} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {step === 2 && <Step2 onBack={handleBack} onNext={handleProfessionNext} professionData={professionData} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {step === 3 && <Step3 onBack={handleBack} onNext={secondQuestion} questinonOne={questinonOne} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {step === 4 && <Step4 onBack={handleBack} onNext={thirdQuestion} questinonTwo={questinonTwo} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {step === 5 && <Step5 onBack={handleBack} onNext={results} questinonTwo={questinonTwo} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {step === 6 && <Step6 onBack={handleBack} onNext={start} companyData={companyData} filledStates={filledStates} setFilledStates={setFilledStates}/>}
      {/* {step === 2 && <Step2 onNext={handleAddressNext} address={address} onBack={handleBack} />} */}
      {/* {step === 3 && <SummaryDisplay user={user} address={address} onBack={handleBack} />} */}
    </div>
  );

}

export default Wizard;