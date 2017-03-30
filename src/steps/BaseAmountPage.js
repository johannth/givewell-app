import React from 'react';

import {NUMBER_OF_YEARS, DEFAULT_DONATION_REPEAT} from '../constants';
import {humanize} from '../utils';
import NextStepButton from '../NextStepButton';
import './SuccessPage.css';
import {calculateLivesSavedInYears} from '../charities';
import './BaseAmountPage.css';

const BaseAmountPage = (
  {nextStep, baseAmount, supportGiveWell, handleInputChange},
) => {
  const livesSavedInNumberOfYears = humanize(
    calculateLivesSavedInYears(
      NUMBER_OF_YEARS,
      baseAmount,
      DEFAULT_DONATION_REPEAT,
    ),
  );
  console.log(supportGiveWell);
  return (
    <div className="PageWrapper">
      <p className="BaseAmountPage__paragraph">
        We research charities to figure out
        <br />
        <span className="bold">how many lives</span> each dollar will save.
      </p>
      <p className="BaseAmountPage__paragraph">
        How much do you want to donate monthly?
      </p>
      <div className="BaseAmountPage__inputWrapper">
        $
        <input
          name="baseAmount"
          type="tel"
          value={baseAmount !== 0 ? baseAmount : undefined}
          onChange={handleInputChange}
          className="BaseAmountPage__input"
        />
      </div>
      <div className="BaseAmountPage__paragraph">
        Your monthly donation
        {' '}
        <br />
        <span className="bold">
          will save {livesSavedInNumberOfYears} lives*
        </span>
        <br />in the next {NUMBER_OF_YEARS} years
      </div>
      <div className="BaseAmountPage__supportGiveWell">
        <input
          name="supportGiveWell"
          type="checkbox"
          checked={supportGiveWell}
          onChange={handleInputChange}
          className="BaseAmountPage__supportGiveWell__checkbox"
        />
        <label>
          Add 10% to help fund {"GiveWell's"} operations
        </label>
      </div>
      <NextStepButton to={nextStep} disabled={!baseAmount}>
        Next
      </NextStepButton>
      <p className="BaseAmountPage__footnote">
        *These are always imperfect calculations, but we try to keep them as accurate as possible. Read our Top Charities process for more.
      </p>
    </div>
  );
};

export default BaseAmountPage;
