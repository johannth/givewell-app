import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import IntroPage from './IntroPage';
import Header from './Header';
import BaseAmountPage from './steps/BaseAmountPage';
import DonationAllocationPage from './steps/DonationAllocationPage';
import PaymentPage from './steps/PaymentPage';
import PersonalInfoPage from './steps/PersonalInfoPage';
import SuccessPage from './steps/SuccessPage';
import SharePage from './SharePage';

const Progress = ({step, totalSteps}) => {
  const percentageCompleted = step / totalSteps * 100;
  const progressBarStyle = {
    width: percentageCompleted + '%',
  };

  return (
    <div className="ProgressBar__wrapper">
      <div className="ProgressBar__background">
        <div className="ProgressBar__bar" style={progressBarStyle} />
      </div>
    </div>
  );
};

const DonateFormPage = ({match, state, handleInputChange, handleOnBlur}) => {
  const baseAmount = parseInt(state.values.baseAmount, 10);

  const steps = [
    <BaseAmountPage
      baseAmount={baseAmount}
      supportGiveWell={state.values.supportGiveWell}
      handleInputChange={handleInputChange}
    />,
    <DonationAllocationPage
      baseAmount={baseAmount}
      supportGiveWell={state.values.supportGiveWell}
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
      baseAmount={baseAmount}
      supportGiveWell={state.values.supportGiveWell}
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
    <SuccessPage
      notifyAllocations={state.values.notifyAllocations}
      notifyGiveWellMonthly={state.values.notifyGiveWellMonthly}
      notifyMyImpact={state.values.notifyMyImpact}
      handleInputChange={handleInputChange}
    />,
  ];

  const step = parseInt(match.params.step, 10);
  return (
    <div className="App__Container">
      <Header small={true} />
      <div className="Page">
        <Progress step={step} totalSteps={steps.length} />
        {React.cloneElement(steps[step - 1], {
          nextStep: step === steps.length
            ? '/donate/success'
            : `/donate/step/${step + 1}`,
        })}
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        baseAmount: 0,
        supportGiveWell: false,
        firstName: '',
        lastName: '',
        email: '',
        notifyAllocations: true,
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
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route
            path="/donate/step/:step"
            render={this.passState.bind(this, DonateFormPage)}
          />
          <Route
            exact
            path="/donate/success"
            render={this.passState.bind(this, SharePage)}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
