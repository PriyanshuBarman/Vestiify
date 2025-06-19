const timeUnits = {
  "1M": { months: 1 },
  "6M": { months: 6 },
  "1Y": { years: 1 },
  "3Y": { years: 3 },
  "5Y": { years: 5 },
};

// This fnc call all the fnc's that are below and return the data in the format that is required by the chart component
export function getChartData(fullChartData, selectedRange) {
  const startTimestamp = getStartTimeStamp(selectedRange, fullChartData);
  const startIndex = selectedRange === "5Y" ? 1 : binarySearchIndex(fullChartData, startTimestamp);
  const chartData = selectedRange === "5Y" ? fullChartData : fullChartData?.slice(startIndex);
  const returnPercentage = getReturnPercentage(fullChartData, startIndex, selectedRange);

  return { returnPercentage, chartData };
}

export function getStartTimeStamp(selectedRange, fullChartData) {
  if (!fullChartData) return;

  const { months = 0, years = 0 } = timeUnits[selectedRange] || {};
  const lastNavDate = new Date();
  const startTimestamp = new Date(fullChartData[fullChartData.length - 1]?.timestamp * 1000);

  if (months) startTimestamp.setMonth(lastNavDate.getMonth() - months);
  if (years) startTimestamp.setFullYear(lastNavDate.getFullYear() - years);

  return Math.floor(startTimestamp.getTime() / 1000); // Unix timestamp in seconds
}

export function getReturnPercentage(fullChartData, startIndex, range) {
  if (!fullChartData) return;

  let startNav = fullChartData[startIndex]?.nav;
  let endNav = fullChartData[fullChartData.length - 1]?.nav;

  const { months = 0, years = 0 } = timeUnits[range] || {};

  if (months || range === "1Y") {
    const absReturn = ((endNav - startNav) / startNav) * 100;
    return absReturn.toFixed(2);
  }
  const days = years * 365;
  const annualizedReturn = (Math.pow(endNav / startNav, 365 / days) - 1) * 100;
  // const annualizedReturn = (Math.pow(endNav / startNav, 1 / years) - 1) * 100;
  return annualizedReturn.toFixed(2);
}


function binarySearchIndex(fullChartData, startTimestamp) {
  let low = 0;
  let high = fullChartData?.length - 1;
  let result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (fullChartData[mid]?.timestamp <= startTimestamp) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return result;
}

// Day Change Percentage
export function getDayChange(fullChartData) {
  if (!fullChartData) return;

  const startNav = fullChartData[fullChartData.length - 2]?.nav;
  const endNav = fullChartData[fullChartData.length - 1]?.nav;
  let dayChange = (((endNav - startNav) / startNav) * 100).toFixed(2);
  dayChange = dayChange >= 0 ? `+${dayChange}` : `${dayChange}`; // adding '+' sign for positive values

  return dayChange;
}