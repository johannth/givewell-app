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
      <div className="PageWrapper Page">
        <h2 className="IntroPage__header">
          Make your donations <br />
          <span className="bold">reach further</span>
        </h2>
        <p className="IntroPage__paragraph">
          {' '}
          GiveWell is a world leading nonprofit
          dedicated to finding the {"world's"}
          {' '}
          <span className="bold">top charities </span>
          through in-depth analysis.
        </p>
        <h3 className="IntroPage__subheader">
          <span className="bold">Top charities</span> are:
        </h3>
        <ul className="IntroPage__bulletpoints">
          <li className="IntroPage__bulletpoint">
            <img
              className="IntroPage__bulletpoint__icon"
              src={evidence}
              alt="Evidence backed"
            />
            <div>
              <h4 className="IntroPage__bulletpoint__header">
                Evidence backed
              </h4>
              <p className="IntroPage__bulletpoint__description">
                Research and experiments show that the charity’s work  is actually impactful.
              </p>
            </div>
          </li>
          <li className="IntroPage__bulletpoint">
            <img
              className="IntroPage__bulletpoint__icon"
              src={costeffective}
              alt="Evidence backed"
            />
            <div>
              <h4 className="IntroPage__bulletpoint__header">
                Cost-efficient
              </h4>
              <p className="IntroPage__bulletpoint__description">
                The charity has consistently been able to save lives while keeping cost down.
              </p>
            </div>
          </li>
          <li className="IntroPage__bulletpoint">
            <img
              className="IntroPage__bulletpoint__icon"
              src={vetted}
              alt="Thoroughly vetted"
            />
            <div>
              <h4 className="IntroPage__bulletpoint__header">
                Thoroughly vetted
              </h4>
              <p className="IntroPage__bulletpoint__description">
                GiveWell has thoroughly vetted the charity organization through multiple interviews.
              </p>
            </div>
          </li>
          <li className="IntroPage__bulletpoint">
            <img
              className="IntroPage__bulletpoint__icon"
              src={unfunded}
              alt="Underfunded"
            />
            <div>
              <h4 className="IntroPage__bulletpoint__header">
                Underfunded
              </h4>
              <p className="IntroPage__bulletpoint__description">
                The charity is able to recieve and use additional funds effectively at this time.
              </p>
            </div>
          </li>
        </ul>
        <p className="IntroPage__paragraph">
          GiveWell makes your life easier by enabling you to donate to
          {' '}
          {"today's"}
          {' '}
          <span className="bold">recommended top charities.</span>
        </p>
        <p className="IntroPage__paragraph">
          Want to maximize the impact of your charity donations?
        </p>
        <NextStepButton to="/donate/step/1">
          Count me in
        </NextStepButton>
      </div>
    </div>
  );
};

export default IntroPage;
