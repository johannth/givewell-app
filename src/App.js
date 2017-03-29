import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import logo from './gwlogo.png';
import chart from './chart.png';
import evidence from './1evidence.png';
import costeffective from './2costeffective.png';
import vetted from './3vetted.png';
import unfunded from './4unfunded.png';

import NextStepButton from './NextStepButton';
import BaseAmountPage from './steps/BaseAmountPage';
import DonationAllocationPage from './steps/DonationAllocationPage';
import PaymentPage from './steps/PaymentPage';
import PersonalInfoPage from './steps/PersonalInfoPage';
import SuccessPage from './steps/SuccessPage';
import SharePage from './steps/SharePage';

const IntroPage = () => {
  return (
    <div className="IntroPage__wrapper">
      <div className="IntroPage__header">
        Make your donations
        <br/> <span className="bold">reach further</span>
      </div>
      <div className="IntroPage__content">
        <div> 
        GiveWell is a world leading nonprofit 
        <br/>dedicated to finding <span className="bold">outstanding charities </span> 
        <br/>through in-depth analysis.
        </div>
        <img src={chart} alt="chart" />
        <img src={evidence} alt="evidence backed" />
        <img src={costeffective} alt="cost effective" />
        <img src={vetted} alt="vetted" />
        <img src={unfunded} alt="unfunded" />
        <div>
          Maximize the lives your donations save, 
          <br/> with {"GiveWell's"} help.
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

const DonateFormPage = ({match, state, handleInputChange, handleOnBlur}) => {
  const steps = [
    <BaseAmountPage
      baseAmount={state.values.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <DonationAllocationPage
      baseAmount={state.values.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <PersonalInfoPage
      firstName={state.values.firstName}
      firstNameBlurred={state.blurred.firstName}
      lastName={state.values.lastName}
      lastNameBlurred={state.blurred.lastName}
      email={state.values.email}
      emailBlurred={state.blurred.email}
      handleInputChange={handleInputChange}
      handleOnBlur={handleOnBlur}
    />,
    <PaymentPage
      baseAmount={state.values.baseAmount}
      creditCardName={state.values.creditCardName}
      creditCardNameBlurred={state.blurred.creditCardName}
      creditCardNumber={state.values.creditCardNumber}
      creditCardNumberBlurred={state.blurred.creditCardNumber}
      creditCardExpiration={state.values.creditCardExpiration}
      creditCardExpirationBlurred={state.blurred.creditCardExpiration}
      creditCardCVC={state.values.creditCardCVC}
      creditCardCVCBlurred={state.blurred.creditCardCVC}
      handleInputChange={handleInputChange}
      handleOnBlur={handleOnBlur}
    />,
    <SuccessPage />,
    <SharePage />,
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
      values: {
        baseAmount: 0,
        firstName: '',
        lastName: '',
        email: '',
      },
      blurred: {firstName: false, lastName: false, email: false},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const state = {
      ...this.state,
      values: {...this.state.values, [name]: value},
    };

    this.setState(state);
  }

  handleOnBlur(event) {
    const target = event.target;
    const name = target.name;

    const state = {
      ...this.state,
      blurred: {...this.state.blurred, [name]: true},
    };

    this.setState(state);
  }

  passState(ChildComponent, match) {
    return (
      <ChildComponent
        state={this.state}
        handleInputChange={this.handleInputChange}
        handleOnBlur={this.handleOnBlur}
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
