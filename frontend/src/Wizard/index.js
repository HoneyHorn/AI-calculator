import React, { useState } from 'react';
import axios from 'axios';
import { Step1 } from "./Step1";
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';

function Wizard() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState(null)
  const [professionData, setProfessionData] = useState({})
  const [questinonOneValue, setQuestinonOneValue] = useState('')
  const [asnwerOneValue, setAsnwerOneValue] = useState('')
  const [questinonTwoValue, setQuestinonTwoValue] = useState('')
  const [answerTwoValue, setAnswerTwoValue] = useState('')
  const [reportValue, setReportValue] = useState('')

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
        setQuestinonOneValue(data['first_question'])
        setQuestinonTwoValue(data['second_question'])
      })
      .catch(error => {
        console.error('Error while sending data to server: ', error);
    });

    setStep(3); // Переходим на новый шаг
  };

  const handleQuestinonOneValueNext = answerOneValue => {
    setAsnwerOneValue(answerOneValue)

    setStep(4); // Переходим на новый шаг
  };

  const handleQuestinonTwoValueNext = answerTwoValue => {
    setAnswerTwoValue(answerTwoValue)
    
    const post_data = {
                        companyData, 
                        professionData, 
                        questinonOneValue, 
                        asnwerOneValue,
                        questinonTwoValue,
                        answerTwoValue,
                      }

    axios.post('http://localhost:5000/report_creation', post_data)
      .then(response => {
        setReportValue(response.data)
      })
      .catch(error => {
        console.error('Error while sending data to server: ', error);
    });

    setStep(5); // Переходим на новый шаг
  };

  const handleBack = () => {
    setStep(step - 1);
    
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleCompanyNext} companyData={companyData} />}
      {step === 2 && <Step2 onBack={handleBack} onNext={handleProfessionNext} professionData={professionData} />}
      {step === 3 && <Step3 onBack={handleBack} onNext={handleQuestinonOneValueNext} questinonOneValue={questinonOneValue}/>}
      {step === 4 && <Step4 onBack={handleBack} onNext={handleQuestinonTwoValueNext} questinonTwoValue={questinonTwoValue}/>}
      {step === 5 && <Step5 onBack={handleBack} reportValue={reportValue}/>}
      {/* {step === 3 && <SummaryDisplay user={user} address={address} onBack={handleBack} />} */}
    </div>
  );

}

export default Wizard;