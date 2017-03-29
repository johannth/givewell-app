import React from 'react';

import NextStepButton from '../NextStepButton';
import './SharePage.css';

const SuccessPage = ({nextStep}) => {
  return (
    <div>
      <br />
      <div className="SuccessPage__header">
        <span className="bold">Thanks!</span>
      </div>

      <div className="SuccessPage__content">
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
      </div>
      <NextStepButton to={nextStep}>
        Sign me up
      </NextStepButton>
    </div>
  );
};

export default SuccessPage;
