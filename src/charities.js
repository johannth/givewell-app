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

export const calculateDonationAllocationPerRepeat = baseAmount => {
  return mapCharities((charityName, info) => {
    const yourDonation = baseAmount * info.donationRatio;
    return {
      charityName,
      donationRatio: info.donationRatio,
      yourDonation,
    };
  }).filter(({charityName, donationRatio, yourDonation}) => donationRatio > 0);
};

const calculateLivesSavedInOneYearForCharity = (
  baseAmountYearly,
  charityInfo,
) => {
  const yearlyDonationToCharity = baseAmountYearly * charityInfo.donationRatio;
  return yearlyDonationToCharity * charityInfo.livesSavedPerDollarPerYear;
};

export const calculateLivesSavedInYears = (
  numberOfYears,
  baseAmount,
  donationRepeat,
) => {
  return sum(
    mapCharities((charityName, charityInfo) => {
      const baseAmountYearly = baseAmount * repeatMultiplier(donationRepeat);
      return calculateLivesSavedInOneYearForCharity(
        baseAmountYearly,
        charityInfo,
      ) * numberOfYears;
    }),
  );
};
