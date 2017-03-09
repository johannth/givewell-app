import React from 'react';
import './IntroPage.css';
import { Link } from 'react-router-dom';

const IntroPage = () => {

  return (
    <div className="IntroPage__wrapper">
      <div className="IntroPage__header">
        Make your donations reach further
      </div>
      <div className="IntroPage__content">
        <div>
          <a href="https://givewell.org">GiveWell</a> is a world leading nonprofit dedicated to finding outstanding giving opportunities through in-depth analysis.
        </div>  
        <div>
          Maximize the impact of your charity donations with GiveWells help.
        </div>
      </div>
      <div className="IntroPage__CTA">
        <Link to="/donate/step/1">Count me in!</Link>
      </div>
    </div>
  );
};

export default IntroPage;
