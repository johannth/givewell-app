import React from 'react';

import NextStepButton from '../NextStepButton';
import './SuccessPage.css';

const SuccessPage = ({nextStep}) => {
  return (
    <div className="SharePage__wrapper">
      <div className="SharePage__header">
        Help others
        <br/><span className="bold">make a difference.</span>
      </div>
      <NextStepButton to={nextStep}>
        Back to GiveWell
      </NextStepButton>
    </div>
  );
};

export default SuccessPage;
