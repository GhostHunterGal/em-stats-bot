export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const timePassedSince = (timestamp: number): string => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDifference = currentTimestamp - timestamp;
  const daysInYear = 365;

  const yearsPassed = Math.floor(timeDifference / (daysInYear * 24 * 60 * 60));
  const remainingDays = Math.floor(
    (timeDifference % (daysInYear * 24 * 60 * 60)) / (24 * 60 * 60)
  );

  if (yearsPassed === 0) {
    return `${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago`;
  } else {
    return `${yearsPassed} year${
      yearsPassed !== 1 ? 's' : ''
    }, ${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago`;
  }
};
