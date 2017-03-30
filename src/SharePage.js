import React from 'react';

import NextStepButton from './NextStepButton';
import Header from './Header';
import FacebookShareIcon from './FacebookShareIcon.svg';
import TwitterShareIcon from './TwitterShareIcon.svg';
import TumblrShareIcon from './TumblrShareIcon.svg';

import './SharePage.css';

const SuccessPage = ({}) => {
  return (
    <div className="App__Container">
      <Header />
      <div className="PageWrapper Page">
        <h2 className="SharePage__header">
          Help others
          <br />
          <span className="bold">make an impact</span>
        </h2>
        <p className="SharePage__paragraph">
          Tell your friends about your donation and GiveWell
        </p>
        <p className="SharePage__paragraph">
          Every donation counts
        </p>
        <div className="SharePage__shareButtons">
          <img src={FacebookShareIcon} />
          <img src={TwitterShareIcon} />
          <img src={TumblrShareIcon} />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
