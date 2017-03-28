import React from 'react';

import NextStepButton from '../NextStepButton';

import './PaymentPage.css';

const PaymentPage = ({nextStep}) => {
  return (
    <div>
      <h2>Payment Method</h2>
      <div>
        <input type="text" placeholder="Cardholder Name" />
        <input type="tel" placeholder="Credit Card Number" />
        <input type="text" placeholder="Nationality" />
        <input type="text" placeholder="mm/yy" />
        <input type="tel" placeholder="cvc" />
      </div>
      <div>
        <a>PayPal</a>
      </div>
      <NextStepButton to={nextStep}>
        Checkout
      </NextStepButton>
    </div>
  );
};

export default PaymentPage;
