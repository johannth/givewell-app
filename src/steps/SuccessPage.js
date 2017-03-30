import React from 'react';

import NextStepButton from '../NextStepButton';
import './SuccessPage.css';

const SuccessPage = (
  {
    nextStep,
    notifyAllocations,
    notifyGiveWellMonthly,
    notifyMyImpact,
    handleInputChange,
  },
) => {
  return (
    <div className="PageWrapper">
      <h2 className="SuccessPage__header">Thank you!</h2>
      <p className="SuccessPage__paragraph">
        {"We'll make sure your donation is as impactful as possible"}
      </p>
      <ul className="SuccessPage__list">
        <li className="SuccessPage__list__item">
          <input
            type="checkbox"
            name="notifyAllocations"
            checked={notifyAllocations}
            onChange={handleInputChange}
            className="SuccessPage__checkbox"
          />
          <label>
            Notify me when my donations change  according to the recommended allocations.
          </label>
        </li>
      </ul>
      <p className="SuccessPage__paragraph">
        You can
        {' '}
        <span className="bold">subscribe to our newsletters</span>
        {' '}
        if you want to get updates on your donation:
      </p>
      <ul id="SuccessPage__optionalNotification" className="SuccessPage__list">
        <li className="SuccessPage__list__item">
          <input
            type="checkbox"
            name="notifyGiveWellMonthly"
            checked={notifyGiveWellMonthly}
            onChange={handleInputChange}
            className="SuccessPage__checkbox"
          />
          <label>Receive monthly GiveWell newsletter</label>
        </li>
        <li className="SuccessPage__list__item">
          <input
            type="checkbox"
            name="notifyMyImpact"
            checked={notifyMyImpact}
            onChange={handleInputChange}
            className="SuccessPage__checkbox"
          />
          <label>Receive periodice email on your impact</label>
        </li>
      </ul>
      <NextStepButton to={nextStep}>
        Sign me up
      </NextStepButton>
    </div>
  );
};

export default SuccessPage;
