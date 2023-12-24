export const formatNumberWithSuffix = (value: number): string => {
  const suffixes: string[] = ['', 'K', 'M', 'B', 'T'];

  let formattedValue: number = value;
  let suffixIndex: number = 0;

  while (formattedValue >= 1000) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  return `${formattedValue.toFixed(3)}${suffixes[suffixIndex]}`;
};

const createNumberFormatter = (
  minimumFractionDigits: number | undefined = undefined,
  maximumFractionDigits: number | undefined = undefined
): Intl.NumberFormat => {
  const options = {
    minimumFractionDigits,
    maximumFractionDigits,
  };

  return new Intl.NumberFormat('en-US', options);
};

export const numFor2 = createNumberFormatter(2, 2);
export const numFor3 = createNumberFormatter();
export const numFor9 = createNumberFormatter(undefined, 9);
