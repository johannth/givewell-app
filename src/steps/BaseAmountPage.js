import React from 'react';

import {NUMBER_OF_YEARS, DEFAULT_DONATION_REPEAT} from '../constants';
import {humanize} from '../utils';
import NextStepButton from '../NextStepButton';
import './SuccessPage.css';
import {calculateLivesSavedInYears} from '../charities';
import './BaseAmountPage.css';

const LivesSavedCalculations = ({baseAmount}) => {
  const livesSavedInNumberOfYears = humanize(
    calculateLivesSavedInYears(
      NUMBER_OF_YEARS,
      baseAmount,
      DEFAULT_DONATION_REPEAT,
    ),
  );
  return (
    <div>
      Your monthly donation of ${baseAmount}
      {' '}
      will save ~{livesSavedInNumberOfYears}
      {' '}
      lives in the next {NUMBER_OF_YEARS} years
    </div>
  );
};

const BaseAmountPage = ({nextStep, baseAmount, handleInputChange}) => {
  return (
    <div className="DonateFormPage1__wrapper">
      <div className="DonateFormPage1__donationWrapper">
        <p>
          We research charities to figure out how many lives each dollar will save.
        </p>
        <p>How much do you want to donate monthly?</p>
        <div className="DonateFormPage1__inputWrapper">
          $
          <input
            name="baseAmount"
            type="tel"
            value={baseAmount}
            onChange={handleInputChange}
            className="DonateFormPage1__input"
          />
        </div>
        {baseAmount && <LivesSavedCalculations baseAmount={baseAmount} />}
        <NextStepButton to={nextStep} disabled={!baseAmount}>
          Next
        </NextStepButton>
      </div>
    </div>
  );
};

export default BaseAmountPage;
