import React from 'react';

import classNames from 'classnames';
import creditcards from 'creditcards';

import NextStepButton from '../NextStepButton';
import {calculateMonthlyTotal} from '../charities';
import {humanize} from '../utils';
import './PaymentPage.css';

const expirationIsValid = creditCardExpiration => {
  const month_year = creditCardExpiration.split('/');
  return creditcards.expiration.month.isValid(
    creditcards.expiration.month.parse(month_year[0]),
  ) &&
    creditcards.expiration.year.isValid(
      creditcards.expiration.year.parse(month_year[1]),
    );
};

const PaymentPage = (
  {
    nextStep,
    baseAmount,
    supportGiveWell,
    creditCardName,
    creditCardNameBlurred,
    creditCardNumber,
    creditCardNumberBlurred,
    creditCardExpiration,
    creditCardExpirationBlurred,
    creditCardCVC,
    creditCardCVCBlurred,
    handleInputChange,
    handleOnBlur,
  },
) => {
  const creditCardNameIsValid = creditCardName && creditCardName.length > 0;
  const creditCardNumberIsValid = creditCardNumber &&
    creditcards.card.isValid(creditCardNumber);
  const creditCardExpirationIsValid = creditCardExpiration &&
    expirationIsValid(creditCardExpiration);
  const creditCardCVCIsValid = creditCardCVC &&
    creditcards.cvc.isValid(creditCardCVC);
  const isValid = creditCardNameIsValid &&
    creditCardNumberIsValid &&
    creditCardExpirationIsValid &&
    creditCardCVCIsValid;

  const total = calculateMonthlyTotal(baseAmount, supportGiveWell);

  return (
    <div className="PageWrapper">
      <div className="PaymentPage__paragraph">
        You will be charged
        <span className="bold"> ${humanize(total)}</span>
        {' '}
        on a monthly basis. You can cancel your donation at any time.
      </div>
      <div>
        <input
          type="text"
          name="creditCardName"
          className={classNames({
            Input: true,
            'Input--error': creditCardNameBlurred && !creditCardNameIsValid,
          })}
          value={creditCardName}
          placeholder="Cardholder Name"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <input
          type="tel"
          name="creditCardNumber"
          className={classNames({
            Input: true,
            'Input--error': creditCardNumberBlurred && !creditCardNumberIsValid,
          })}
          value={creditCardNumber}
          placeholder="Credit Card Number"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <div className="PaymentPage__expiration_cvc">
          <input
            id="PaymentPage__expiration"
            type="text"
            name="creditCardExpiration"
            className={classNames({
              Input: true,
              'Input--error': creditCardExpirationBlurred &&
                !creditCardExpirationIsValid,
            })}
            value={creditCardExpiration}
            placeholder="mm/yy"
            onChange={handleInputChange}
            onBlur={handleOnBlur}
          />
          <input
            id="PaymentPage__cvc"
            type="tel"
            name="creditCardCVC"
            className={classNames({
              Input: true,
              'Input--error': creditCardCVCBlurred && !creditCardCVCIsValid,
            })}
            value={creditCardCVC}
            placeholder="cvc"
            onChange={handleInputChange}
            onBlur={handleOnBlur}
          />
        </div>
      </div>
      <NextStepButton to={nextStep} disabled={!isValid}>
        Checkout
      </NextStepButton>
      <div className="PaymentPage__or">
        or
      </div>
      <div>
        <img
          src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/blue-rect-paypal-60px.png"
          alt="PayPal"
        />
      </div>

    </div>
  );
};

export default PaymentPage;
