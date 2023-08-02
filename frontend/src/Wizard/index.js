import React, { useState } from 'react';
import { Step1 } from "./Step1";
import { Step2 } from './Step2';
import Step3 from './Step3';

function Wizard() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState(null)

  const handleCompanyNext = companyData => {
    setCompanyData(companyData);
    setStep(2);
  };

  const handleBack = () => {
    if(step === 3) setStep(2);
    if(step === 2) setStep(1);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleCompanyNext} companyData={companyData} />}
      {step === 2 && <Step2 onBack={handleBack} companyData={companyData} />}
      {/* {step === 2 && <Step2 onNext={handleAddressNext} address={address} onBack={handleBack} />} */}
      {/* {step === 3 && <SummaryDisplay user={user} address={address} onBack={handleBack} />} */}
    </div>
  );

}

export default Wizard;