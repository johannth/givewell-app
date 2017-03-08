import React, { Component } from 'react';
import './App.css';

const GIVEWELL_IMPACT = {
  'Against Malaria Foundation': {
    livesSavedPerDollarPerYear: 0.0003163024794,
    recommendedDonation: 0.75
  },
  'Deworm the World': {
    livesSavedPerDollarPerYear: 0.001109882262,
    recommendedDonation: 0
  },
  'Schistosomiasis Control Initiative': {
    livesSavedPerDollarPerYear: 0.0007285818717,
    recommendedDonation: 0.25
  },
  GiveDirectly: {
    livesSavedPerDollarPerYear: 0.0001434415929,
    recommendedDonation: 0
  },
  Sightsavers: {
    livesSavedPerDollarPerYear: 0.0004339612324,
    recommendedDonation: 0
  },
  'Malaria Consortium': {
    livesSavedPerDollarPerYear: 0.0003099860857,
    recommendedDonation: 0
  }
};

const humanize = x => {
  return x.toFixed(2).replace(/\.?0*$/, '');
};

const calculateDonations = yearlyTotalBaseAmount => {
  return Object.entries(GIVEWELL_IMPACT)
    .map(charityName_info => {
      const charityName = charityName_info[0];
      const info = charityName_info[1];
      const yourDonation = yearlyTotalBaseAmount * info.recommendedDonation;
      return {
        charityName,
        yourDonation,
        livesSaved: yourDonation * info.livesSavedPerDollarPerYear
      };
    })
    .filter(({ charityName, yourDonation, livesSaved }) => yourDonation > 0);
};

const ImpactTable = ({ donations }) => {
  return (
    <table>
      {donations.map(({ charityName, yourDonation, livesSaved }) => {
        return (
          <tr>
            <td>{charityName}</td>
            <td>${yourDonation}</td>
            <td>{humanize(livesSaved)}</td>
          </tr>
        );
      })}
    </table>
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const baseAmount = parseInt(this.state.baseAmount || '0', 10);
    const supportGiveWell = this.state.supportGiveWell;
    const giveWellSupport = supportGiveWell ? 0.1 * baseAmount : 0;
    console.log(this.state);
    const total = baseAmount + giveWellSupport;

    const interval = this.state.interval;

    var multiplier = 1;
    if (this.state.interval === 'monthly') {
      multiplier = 12;
    } else if (this.state.interval === 'quarterly') {
      multiplier = 4;
    }

    const yearlyTotal = total * multiplier;
    const yearlyTotalBaseAmount = baseAmount * multiplier;

    const add = (a, b) => a + b;
    const donations = calculateDonations(yearlyTotalBaseAmount);
    const livesSaved = donations
      .map(donation => donation.livesSaved)
      .reduce(add, 0);

    return (
      <div className="App">
        <div className="">
          <h2>Donate to GiveWell</h2>
        </div>
        <div className="body">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <div>
                <label>How much do you want to donate?</label>
                <span>$</span>
                <input
                  name="baseAmount"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="supportGiveWell"
                  checked={supportGiveWell}
                  onChange={this.handleInputChange}
                />
                <label>Add 10% to help fund GiveWells operations?</label>
              </div>
              <div>
                <label>Make this donation</label>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="interval"
                      value="once"
                      checked={interval === 'once'}
                      onChange={this.handleInputChange}
                    />
                    <label>Once</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="interval"
                      value="monthly"
                      checked={interval === 'monthly'}
                      onChange={this.handleInputChange}
                    />
                    <label>Every month</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="interval"
                      value="quarterly"
                      checked={interval === 'quarterly'}
                      onChange={this.handleInputChange}
                    />
                    <label>Every quarter</label>
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  Your donation of $
                  {yearlyTotal}
                  {' '}per year will save{' '}
                  {humanize(livesSaved)}
                  {' '}lives!
                </div>
                <ImpactTable donations={donations} />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
