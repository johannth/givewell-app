import React from 'react';

import NextStepButton from '../NextStepButton';
import './DonationAllocationPage.css';
import {calculateDonationAllocationPerRepeat} from '../charities';
import pie from './DonationAllocationInfo.png';

const DonationAllocations = ({baseAmount}) => {
  const donations = calculateDonationAllocationPerRepeat(baseAmount);

  const amountAsStringIfAny = donation => donation || '--';
  return (
    <div className="DonationAllocationPage__content">
      <p>
        This is how your <span className="bold">monthly donation</span> 
        <br/>will be allocated:
      </p>
      <img src={pie} alt="pie chart" />
      <table className="DonationAllocationPage__table">
        <tbody>
          {donations.map(({
            charityName,
            donationRatio,
            yourDonation,
          }) => {
            return (
              <tr key={charityName}>
                <td>{charityName}</td>
                <td>{donationRatio * 100}%</td>
                <td>${amountAsStringIfAny(yourDonation)}</td>
              </tr>
            );
          })}
          <tr>
            <td />
            <td>100%</td>
            <td>${amountAsStringIfAny(baseAmount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const DonationAllocationPage = ({nextStep, baseAmount}) => {
  return (
    <div className="DonationAllocationPage__wrapper">
      <DonationAllocations baseAmount={baseAmount} />
      <NextStepButton to={nextStep}>
        Checkout
      </NextStepButton>
    </div>
  );
};

export default DonationAllocationPage;