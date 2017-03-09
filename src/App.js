import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const GIVEWELL_IMPACT = {
  'Against Malaria Foundation': {
    livesSavedPerDollarPerYear: 0.0003163024794,
    donationRatio: 0.75
  },
  'Deworm the World': {
    livesSavedPerDollarPerYear: 0.001109882262,
    donationRatio: 0
  },
  'Schistosomiasis Control Initiative': {
    livesSavedPerDollarPerYear: 0.0007285818717,
    donationRatio: 0.25
  },
  GiveDirectly: {
    livesSavedPerDollarPerYear: 0.0001434415929,
    donationRatio: 0
  },
  Sightsavers: {
    livesSavedPerDollarPerYear: 0.0004339612324,
    donationRatio: 0
  },
  'Malaria Consortium': {
    livesSavedPerDollarPerYear: 0.0003099860857,
    donationRatio: 0
  }
};

const sum = list => {
  const add = (x, y) => x + y;
  return list.reduce(add, 0);
};

const humanize = x => {
  return x.toFixed(2).replace(/\.?0*$/, '');
};

const mapCharities = f => {
  return Object.entries(GIVEWELL_IMPACT).map(charityName_info => {
    const charityName = charityName_info[0];
    const info = charityName_info[1];
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
      yourDonation
    };
  }).filter(
    ({ charityName, donationRatio, yourDonation }) => donationRatio > 0
  );
};

const calculateLivesSavedInYears = (baseAmountYearly, numberOfYears) => {
  return sum(
    mapCharities((charityName, info) => {
      const yourDonation = baseAmountYearly * info.donationRatio;
      return yourDonation * info.livesSavedPerDollarPerYear * numberOfYears;
    })
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseAmount: null,
      supportGiveWell: false,
      interval: 'once'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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

  render() {
    return (
      <Router>
        <div id="container">
          <Switch>
            <Route exact path="/" component={IntroPage} />
            <Route
              path="/donate/step/:step"
              render={this.passState.bind(this, DonateFormPage)}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const IntroPage = () => (
  <div>
    <h1>Make your donations reach further</h1>
    <p>
      <a href="https://givewell.org">GiveWell</a>
      {' '}
      is a world leading nonprofit dedicated to finding outstanding giving opportunities through in-depth analysis.
    </p>
    <p>Maximize the impact of your charity donations with GiveWells help.</p>
    <p><Link to="/donate/step/1">Count me in!</Link></p>
  </div>
);

const Progress = ({ step, totalSteps }) => (
  <div>Step {step} of {totalSteps}</div>
);

const DonateFormPage = ({ match, state, handleInputChange }) => {
  const totalSteps = 3;
  switch (match.params.step) {
    case '1':
      return (
        <div>
          <Progress step="1" totalSteps={totalSteps} />
          <DonateFormPage1
            baseAmount={state.baseAmount}
            handleInputChange={handleInputChange}
          />
        </div>
      );
    case '2':
      return (
        <div>
          <Progress step="2" totalSteps={totalSteps} />
          <DonateFormPage2
            baseAmount={state.baseAmount}
            handleInputChange={handleInputChange}
          />
        </div>
      );
  }
};

const DonateFormPage1 = ({ baseAmount, handleInputChange }) => {
  const donations = calculateDonations(baseAmount);

  const amountAsStringIfAny = donation => donation ? donation : '--';
  return (
    <div>
      <form>
        <fieldset>
          <div>
            <label>How much do you want to donate monthly?</label>
            <span>$</span>
            <input
              name="baseAmount"
              type="text"
              value={baseAmount}
              onChange={handleInputChange}
            />
            <Link to="/donate/step/2">Next</Link>
          </div>
          <div>
            <p>
              This is how your donation will be allocated
            </p>
            <table>
              <tbody>
                {donations.map((
                  { charityName, donationRatio, yourDonation }
                ) => {
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
        </fieldset>
      </form>
    </div>
  );
};

const DonateFormPage2 = ({ baseAmount, handleInputChange }) => {
  const numberOfYears = 10;
  const baseAmountYearly = baseAmount * repeatMultiplier('monthly');
  const baseAmountNumberOfYears = baseAmountYearly * numberOfYears;
  const livesSavedInNumberOfYears = humanize(
    calculateLivesSavedInYears(baseAmountYearly, numberOfYears)
  );
  return (
    <div>
      <div>
        <label>
          Your monthly donation of $
          {baseAmount}
          {' '} will save{' '}
          {livesSavedInNumberOfYears}
          {' '} lives in the next{' '}
          {numberOfYears} years
        </label>
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
      <div>
        <Link to="/donate/step/3">Checkout</Link>
      </div>
    </div>
  );
};

export default App;
