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

export const getBlockNumber24HoursAgo = async (
  blockNumber: bigint,
  client: any
): Promise<bigint> => {
  const secondsIn24Hours = 24 * 60 * 60;
  const secondsIn5Minutes = 5 * 60;
  const secondsPerBlock = 3;

  const blockDetails = await client.getBlock({ blockNumber: blockNumber });
  const targetTimestamp = Number(blockDetails.timestamp) - secondsIn24Hours;

  const blocksIn23Hours55Min = Math.floor(
    (secondsIn24Hours - secondsIn5Minutes) / secondsPerBlock
  );
  const blockNumber23Hours55Min = blockNumber - BigInt(blocksIn23Hours55Min);

  let blockNumber24HoursAgo = blockNumber23Hours55Min;
  while (true) {
    const block = await client.getBlock({ blockNumber: blockNumber24HoursAgo });
    if (block.timestamp <= targetTimestamp) {
      break;
    }
    blockNumber24HoursAgo--;
  }

  return blockNumber24HoursAgo;
};
