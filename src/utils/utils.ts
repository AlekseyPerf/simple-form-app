export const pluralizeDays = (n: number): string => {
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  if (lastDigit === 1 && lastTwo !== 11) return "день";
  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14))
    return "дня";
  return "дней";
};

export const roundToStep = (
  value: number,
  step: number,
  min: number,
  max: number,
) => {
  const rounded = Math.round(value / step) * step;
  return Math.min(max, Math.max(min, rounded));
};
