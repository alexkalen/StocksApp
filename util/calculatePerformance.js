export function calculatePerformance(cVal, oVal) {
  const stockPerformance = { dolarAmount: 0, percentageAmount: 0 };

  if (cVal === 0 || oVal === 0) {
    stockPerformance.dolarAmount = 0;
    stockPerformance.percentageAmount = 0;

    return stockPerformance;
  }
  stockPerformance.dolarAmount = cVal - oVal;
  stockPerformance.percentageAmount =
    (Math.abs(stockPerformance.dolarAmount) / cVal) * 100;

  return stockPerformance;
}
