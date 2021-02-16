const _ = require("lodash");

function calculateIntrinsicValue(peratio, price, earnings) {
  const lastEPS = earnings.quarterlyEarnings[0].reportedEPS;
  const d = new Date();

  let threeYearEarnings = earnings.quarterlyEarnings.filter((e) => {
    const reported = new Date(e.reportedDate);
    return d.getFullYear() - reported.getFullYear() < 3;
  });

  let fiveYearEarnings = earnings.quarterlyEarnings.filter((e) => {
    const reported = new Date(e.reportedDate);
    return d.getFullYear() - reported.getFullYear() < 5;
  });

  console.log("Last3YearEarning is: ", threeYearEarnings);

  let threeYearGrowth =
    (threeYearEarnings[0].reportedEPS -
      threeYearEarnings[threeYearEarnings.length - 1].reportedEPS) /
    threeYearEarnings[threeYearEarnings.length - 1].reportedEPS;

  let fiveYearGrowth =
    (fiveYearEarnings[0].reportedEPS -
      fiveYearEarnings[fiveYearEarnings.length - 1].reportedEPS) /
    fiveYearEarnings[fiveYearEarnings.length - 1].reportedEPS;

  const iValueThree = lastEPS * (1 + threeYearGrowth) * (price / lastEPS);
  const iValueFive = lastEPS * (1 + fiveYearGrowth) * (price / lastEPS);

  return {
    threeYearValue: iValueThree.toString(),
    fiveYearValue: iValueFive.toString(),
    fourQuarterTrendUp:
      threeYearEarnings[0].reportedEPS > threeYearEarnings[3].reportedEPS,
  };
}

module.exports = { calculateIntrinsicValue };
