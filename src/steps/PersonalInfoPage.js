import React from 'react';
import classNames from 'classnames';

import NextStepButton from '../NextStepButton';
import './PersonalInfoPage.css';
import isEmail from 'validator/lib/isEmail';

const PersonalInfoPage = (
  {
    nextStep,
    firstName,
    firstNameBlurred,
    lastName,
    lastNameBlurred,
    email,
    emailBlurred,
    handleInputChange,
    handleOnBlur,
  },
) => {
  const firstNameIsValid = firstName && firstName.length > 0;
  const lastNameIsValid = lastName && lastName.length > 0;
  const emailIsValid = email && email.length > 0 && isEmail(email);

  const isValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  return (
    <div className="PageWrapper">
      <div>
        <input
          type="text"
          name="firstName"
          className={classNames({
            Input: true,
            'Input--error': firstNameBlurred && !firstNameIsValid,
          })}
          value={firstName}
          placeholder="First Name"
          tabIndex="1"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <input
          type="text"
          name="lastName"
          className={classNames({
            Input: true,
            'Input--error': lastNameBlurred && !lastNameIsValid,
          })}
          value={lastName}
          placeholder="Last Name"
          tabIndex="2"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <input
          type="email"
          name="email"
          className={classNames({
            Input: true,
            'Input--error': emailBlurred && !emailIsValid,
          })}
          value={email}
          tabIndex="3"
          placeholder="Email"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
      </div>
      <NextStepButton to={nextStep} disabled={!isValid}>
        Next
      </NextStepButton>
    </div>
  );
};

export default PersonalInfoPage;
