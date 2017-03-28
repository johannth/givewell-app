import React from 'react';

import NextStepButton from '../NextStepButton';
import './SuccessPage.css';

const SuccessPage = ({nextStep}) => {
  return (
    <div>
      <h2>Thanks!</h2>
      <p>
        You have successfully donated to GiveWell.
        <ul>
          <li>
            <input type="checkbox" />
            <label>Receive monthly GiveWell newsletter</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Receive periodice email on your impact</label>
          </li>
        </ul>
      </p>
      <NextStepButton to={nextStep}>
        Sign me up
      </NextStepButton>
    </div>
  );
};

export default SuccessPage;
