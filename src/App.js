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
import SharePage from './steps/SharePage';

const Progress = ({step, totalSteps}) => {
  const percentageCompleted = step / totalSteps * 100;
  const progressBarStyle = {
    height: '100%',
    width: percentageCompleted + '%',
    backgroundColor: '#f88920',
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
      <Header small={true} />
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
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route
            path="/donate/step/:step"
            render={this.passState.bind(this, DonateFormPage)}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
