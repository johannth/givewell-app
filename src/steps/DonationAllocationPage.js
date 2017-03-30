import React from 'react';

import NextStepButton from '../NextStepButton';
import './DonationAllocationPage.css';
import {calculateDonationAllocationPerRepeat} from '../charities';
import {sum} from '../utils';

const DonationAllocationPage = ({nextStep, baseAmount, supportGiveWell}) => {
  const donations = calculateDonationAllocationPerRepeat(baseAmount);
  if (supportGiveWell) {
    donations.push({
      charityName: "GiveWell's operations",
      yourDonation: baseAmount * 0.1,
    });
  }

  const total = sum(donations.map(d => d.yourDonation));

  const amountAsStringIfAny = donation => donation || '--';

  return (
    <div className="PageWrapper">
      <div>
        <p className="DonationAllocationPage__paragraph">
          We have ranked our top charities based on the value of filling their remaining funding gaps.
        </p>
        <p className="DonationAllocationPage__paragraph">
          Currently this split is our recommended allocation to get the
          {' '}
          <span className="bold">highest impact.</span>
        </p>
        <table className="DonationAllocationPage__charities">
          <tbody>
            {donations.map(({
              charityName,
              charityLogo,
              charityDescription,
              yourDonation,
            }) => {
              return (
                <tr
                  key={charityName}
                  className="DonationAllocationPage__charity"
                >
                  <td className="DonationAllocationPage__charity__logo">
                    {charityLogo && <img src={charityLogo} alt={charityName} />}
                  </td>
                  <td className="DonationAllocationPage__charity__info">
                    <h3 className="DonationAllocationPage__charity__name">
                      {charityName}
                    </h3>
                    {charityDescription &&
                      <p
                        className="DonationAllocationPage__charity__description"
                      >
                        {charityDescription}
                      </p>}
                  </td>
                  <td className="DonationAllocationPage__charity__amount">
                    ${amountAsStringIfAny(yourDonation)}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td />
              <td />
              <td className="DonationAllocationPage__charity__amount">
                ${amountAsStringIfAny(total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <NextStepButton to={nextStep}>
        Checkout
      </NextStepButton>
    </div>
  );
};

export default DonationAllocationPage;
