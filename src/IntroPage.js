import React from 'react';

import chart from './chart.png';
import evidence from './1evidence.png';
import costeffective from './2costeffective.png';
import vetted from './3vetted.png';
import unfunded from './4unfunded.png';
import Header from './Header';
import NextStepButton from './NextStepButton';
import './IntroPage.css';

const IntroPage = () => {
  return (
    <div className="App__Container">
      <Header />
      <div className="PageWrapper">
        <div className="IntroPage__header">
          Make your donations
          <br /> <span className="bold">reach further</span>
        </div>
        <div className="IntroPage__content">
          <div>
            {' '}
            GiveWell is a world leading nonprofit
            <br />
            dedicated to finding
            {' '}
            <span className="bold">outstanding charities </span>
            <br />through in-depth analysis.
          </div>
          <div>
            Maximize the lives your donations save,
            <br /> with {"GiveWell's"} help.
          </div>
        </div>
        <NextStepButton to="/donate/step/1">
          Count me in
        </NextStepButton>
      </div>
    </div>
  );
};

export default IntroPage;
