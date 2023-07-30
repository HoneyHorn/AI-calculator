import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function Wizard() {
  const [step, setStep] = React.useState(1);

  function nextStep() {
    setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step > 1 && <button onClick={prevStep}>Назад</button>}
      {step < 3 && <button onClick={nextStep}>Вперед</button>}
    </div>
  );
}

export default Wizard;