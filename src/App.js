import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import logo from './gwlogo.png';
import chart from './chart.png';

import NextStepButton from './NextStepButton';
import BaseAmountPage from './steps/BaseAmountPage';
import DonationAllocationPage from './steps/DonationAllocationPage';
import PaymentPage from './steps/PaymentPage';
import PersonalInfoPage from './steps/PersonalInfoPage';
import SuccessPage from './steps/SuccessPage';

const IntroPage = () => {
  return (
    <div className="IntroPage__wrapper">
      <div className="IntroPage__header">
        Make your donations reach further
      </div>
      <div className="IntroPage__content">
        <div>
          <a href="https://givewell.org">GiveWell</a>
          {' '}
          is a world leading nonprofit dedicated to finding outstanding charities through in-depth analysis.
        </div>
        <img src={chart} alt="chart" />
        <div>
          {'Maximize the lives your donations save with GiveWells help.'}
        </div>
      </div>
      <NextStepButton to="/donate/step/1">
        Count me in
      </NextStepButton>
    </div>
  );
};

const Progress = ({step, totalSteps}) => {
  const percentageCompleted = step / totalSteps * 100;
  const progressBarStyle = {
    height: '100%',
    width: percentageCompleted + '%',
    backgroundColor: '#669bb5',
    borderRadius: '0px',
  };

  return (
    <div className="ProgressBar__wrapper">
      <div className="ProgressBar__background">
        <div style={progressBarStyle} />
      </div>
    </div>
  );
};

const DonateFormPage = ({match, state, handleInputChange}) => {
  const steps = [
    <BaseAmountPage
      baseAmount={state.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <DonationAllocationPage
      baseAmount={state.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <PersonalInfoPage
      firstName={state.firstName}
      lastName={state.lastName}
      email={state.email}
      handleInputChange={handleInputChange}
    />,
    <PaymentPage />,
    <SuccessPage />,
  ];

  const step = parseInt(match.params.step, 10);
  return (
    <div>
      <Progress step={step} totalSteps={steps.length} />
      {React.cloneElement(steps[step - 1], {
        nextStep: `/donate/step/${step + 1}`,
      })}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseAmount: undefined,
      firstName: '',
      lastName: '',
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  passState(ChildComponent, match) {
    return (
      <ChildComponent
        state={this.state}
        handleInputChange={this.handleInputChange}
        {...match}
      />
    );
  }

  basename() {
    if (window.location.hostname.indexOf('github.io') !== -1) {
      return '/givewell-app';
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <Router basename={this.basename()}>
        <div className="App__Container">
          <div className="App__navBar">
            <img className="App__navBar__logo" src={logo} alt="GiveWell" />
          </div>
          <div className="App__viewportContainer">
            <Switch>
              <Route exact path="/" component={IntroPage} />
              <Route
                path="/donate/step/:step"
                render={this.passState.bind(this, DonateFormPage)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
