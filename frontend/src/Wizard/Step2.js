import React, { useState } from "react";

export const Step2 = ({ onNext, companyData, onBack }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // onNext({  }); // передаем профессию вместе с другими данными
  };

  return(
    <form onSubmit={handleSubmit}>
      <p>Company Name: {companyData.companyName}</p>
      <p>Company Info: {companyData.companyDescription}</p>
      <p>Sphere: {companyData.companySphere.join(', ')}</p>
      <p>Employee: {companyData.sliderEmployeeValue}</p>
      <button type="button" onClick={onBack}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
}
