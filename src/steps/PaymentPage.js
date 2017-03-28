import React from 'react';

import classNames from 'classnames';
import creditcards from 'creditcards';

import NextStepButton from '../NextStepButton';

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

  return (
    <div>
      <h2>Payment Method</h2>
      <div>
        <input
          type="text"
          name="creditCardName"
          className={classNames({
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
            'Input--error': creditCardNumberBlurred && !creditCardNumberIsValid,
          })}
          value={creditCardNumber}
          placeholder="Credit Card Number"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <input
          type="text"
          name="creditCardExpiration"
          className={classNames({
            'Input--error': creditCardExpirationBlurred &&
              !creditCardExpirationIsValid,
          })}
          value={creditCardExpiration}
          placeholder="mm/yy"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <input
          type="tel"
          name="creditCardCVC"
          className={classNames({
            'Input--error': creditCardCVCBlurred && !creditCardCVCIsValid,
          })}
          value={creditCardCVC}
          placeholder="cvc"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
      </div>
      <div>
        <a>PayPal</a>
      </div>
      <NextStepButton to={nextStep} disabled={!isValid}>
        Checkout
      </NextStepButton>
    </div>
  );
};

export default PaymentPage;
