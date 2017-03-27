import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import classNames from 'classnames';

import './App.css';
import logo from '../public/gwlogo.png';

const GIVEWELL_IMPACT = {
  'Against Malaria Foundation': {
    livesSavedPerDollarPerYear: 0.0003163024794,
    donationRatio: 0.75,
  },
  'Deworm the World': {
    livesSavedPerDollarPerYear: 0.001109882262,
    donationRatio: 0,
  },
  'Schistosomiasis Control Initiative': {
    livesSavedPerDollarPerYear: 0.0007285818717,
    donationRatio: 0.25,
  },
  GiveDirectly: {
    livesSavedPerDollarPerYear: 0.0001434415929,
    donationRatio: 0,
  },
  Sightsavers: {
    livesSavedPerDollarPerYear: 0.0004339612324,
    donationRatio: 0,
  },
  'Malaria Consortium': {
    livesSavedPerDollarPerYear: 0.0003099860857,
    donationRatio: 0,
  },
};

const sum = list => {
  const add = (x, y) => x + y;
  return list.reduce(add, 0);
};

const humanize = x => {
  return x.toFixed(2).replace(/\.?0*$/, '');
};

const mapCharities = f => {
  return Object.keys(GIVEWELL_IMPACT).map(charityName => {
    const info = GIVEWELL_IMPACT[charityName];
    return f(charityName, info);
  });
};

const repeatMultiplier = repeat => {
  switch (repeat) {
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    default:
      return 1;
  }
};

const calculateDonations = baseAmount => {
  return mapCharities((charityName, info) => {
    const yourDonation = baseAmount * info.donationRatio;
    return {
      charityName,
      donationRatio: info.donationRatio,
      yourDonation,
    };
  }).filter(({charityName, donationRatio, yourDonation}) => donationRatio > 0);
};

const calculateLivesSavedInYears = (baseAmountYearly, numberOfYears) => {
  return sum(
    mapCharities((charityName, info) => {
      const yourDonation = baseAmountYearly * info.donationRatio;
      return yourDonation * info.livesSavedPerDollarPerYear * numberOfYears;
    }),
  );
};

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
          is a world leading nonprofit dedicated to finding outstanding giving opportunities through in-depth analysis.
        </div>
        <div>
          Maximize the impact of your charity donations with GiveWells help.
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
    <DonateFormPage1
      baseAmount={state.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <DonateFormPage2
      baseAmount={state.baseAmount}
      handleInputChange={handleInputChange}
    />,
    <PersonalInfoPage />,
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

const NextStepButton = ({to, enabled = true, children}) => {
  return (
    <div
      className={classNames(
        'NextStepButton',
        true,
        'NextStepButton--disabled',
        !enabled,
      )}
    >
      <Link
        to={to}
        onClick={e => {
          if (!enabled) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </Link>
    </div>
  );
};

const LivesSavedCalculations = ({baseAmount}) => {
  const numberOfYears = 10;
  const baseAmountYearly = baseAmount * repeatMultiplier('monthly');
  const baseAmountNumberOfYears = baseAmountYearly * numberOfYears;
  const livesSavedInNumberOfYears = humanize(
    calculateLivesSavedInYears(baseAmountYearly, numberOfYears),
  );
  return (
    <div>
      <div>
        A monthly donation of $
        {baseAmount}
        {' '} will save{' '}
        {livesSavedInNumberOfYears}
        {' '} lives in the next{' '}
        {numberOfYears} years
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Monthly</td>
              <td>${baseAmount}</td>
            </tr>
            <tr>
              <td>Yearly</td>
              <td>${baseAmountYearly}</td>
            </tr>
            <tr>
              <td>{numberOfYears} years</td>
              <td>${baseAmountNumberOfYears}</td>
            </tr>
            <tr>
              <td>Lives saved</td>
              <td>{livesSavedInNumberOfYears}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DonationAllocations = ({baseAmount}) => {
  const donations = calculateDonations(baseAmount);

  const amountAsStringIfAny = donation => donation || '--';
  return (
    <div>
      <p>
        This is how your donation will be allocated
      </p>
      <table>
        <tbody>
          {donations.map(({charityName, donationRatio, yourDonation}) => {
            return (
              <tr key={charityName}>
                <td>{charityName}</td>
                <td>{donationRatio * 100}%</td>
                <td>${amountAsStringIfAny(yourDonation)}</td>
              </tr>
            );
          })}
          <tr>
            <td />
            <td>100%</td>
            <td>${amountAsStringIfAny(baseAmount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const DonateFormPage1 = ({nextStep, baseAmount, handleInputChange}) => {
  return (
    <div className="DonateFormPage1__wrapper">
      <div className="DonateFormPage1__donationWrapper">
        <label>How much do you want to donate monthly?</label>
        <div className="DonateFormPage1__inputWrapper">
          {' '}$
          <input
            name="baseAmount"
            type="tel"
            value={baseAmount}
            onChange={handleInputChange}
            className="DonateFormPage1__input"
          />
        </div>
        {baseAmount && <LivesSavedCalculations baseAmount={baseAmount} />}
        <NextStepButton to={nextStep} enabled={baseAmount}>
          Next
        </NextStepButton>
      </div>
    </div>
  );
};

const DonateFormPage2 = ({nextStep, baseAmount}) => {
  return (
    <div className="DonateFormPage2__wrapper">
      <DonationAllocations baseAmount={baseAmount} />
      <NextStepButton to={nextStep} enabled={true}>
        Checkout
      </NextStepButton>
    </div>
  );
};

const PersonalInfoPage = ({nextStep}) => {
  return (
    <div>
      <h2>My Info</h2>
      <div>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
      </div>
      <div>
        <p>Optional information</p>
        <input type="text" placeholder="Nationality" />
        <input type="text" placeholder="Gender" />
        <input type="tel" placeholder="Age" />
      </div>
      <NextStepButton to={nextStep}>
        Next
      </NextStepButton>
    </div>
  );
};

const PaymentPage = ({nextStep}) => {
  return (
    <div>
      <h2>Payment Method</h2>
      <div>
        <input type="text" placeholder="Cardholder Name" />
        <input type="tel" placeholder="Credit Card Number" />
        <input type="text" placeholder="Nationality" />
        <input type="text" placeholder="mm/yy" />
        <input type="tel" placeholder="cvc" />
      </div>
      <div>
        <a>PayPal</a>
      </div>
      <NextStepButton to={nextStep}>
        Checkout
      </NextStepButton>
    </div>
  );
};

const SuccessPage = ({nextStep}) => {
  return (
    <div>
      <h2>Thanks!</h2>
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
      <NextStepButton to={nextStep}>
        Sign me up
      </NextStepButton>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseAmount: undefined,
      supportGiveWell: false,
      interval: 'once',
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
            <img className="App__navBar__logo" src={logo} />
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
