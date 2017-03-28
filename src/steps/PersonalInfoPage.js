import React from 'react';

import NextStepButton from '../NextStepButton';
import './PersonalInfoPage.css';

const PersonalInfoPage = (
  {nextStep, firstName, lastName, email, handleInputChange},
) => {
  const isValid = firstName &&
    firstName.length > 0 &&
    lastName &&
    lastName.length > 0 &&
    email &&
    email.length > 0;

  return (
    <div>
      <h2>My Info</h2>
      <div>
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          tabIndex="1"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          tabIndex="2"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          tabIndex="3"
          placeholder="Email"
        />
      </div>
      <NextStepButton to={nextStep} disabled={!isValid}>
        Next
      </NextStepButton>
    </div>
  );
};

export default PersonalInfoPage;
