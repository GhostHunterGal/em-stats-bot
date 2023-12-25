import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { formatNumberWithSuffix, numFor2, numFor3 } from '../../utils/formats';

export const futuresMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg = `
<b><a href="https://elephant.money/futures.html">🪙 FUTURES 🪙</a></b>
  
<i>1st Deposit:</i> <b>${calcs.futures1stDeposit}</b>
  
<u>Liabilities</u>
<i>TVL:</i> <b>$${formatNumberWithSuffix(calcs.futuresCurrentBalance)}</b>
<i>Daily:</i> <b>$${formatNumberWithSuffix(
    calcs.dailyLiabilities
  )} (${numFor2.format(calcs.dailyLiabilitiesAsPercentage)}% of Bertha)</b>
<i>Est. Daily Yield:</i> <b>${
    calcs.bnbReserveValue >= calcs.dailyLiabilities
      ? 0.5
      : numFor3.format(calcs.futuresDailyYield)
  }%</b>
  
<u>Givers of Yield</u>
<i>BNB Reserve:</i> <b>${formatNumberWithSuffix(
    data.bnbReserveBnbBalance
  )} ($${formatNumberWithSuffix(calcs.bnbReserveValue)})</b>
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    data.berthaElephantBalance
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValue)})</b>
  
<u>Activity</u>
<i>Deposits:</i> <b>$${formatNumberWithSuffix(calcs.futuresTotalDeposited)}</b>
<i>Compounds:</i> <b>$${formatNumberWithSuffix(
    calcs.futuresTotalCompoundDeposited
  )}</b>
<i>Withdrawals:</i> <b>$${formatNumberWithSuffix(calcs.withdrawals)}</b>
<i>Rewards:</i> <b>$${formatNumberWithSuffix(calcs.futuresTotalRewards)}</b>
<i>Participants:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalUsers)}</b>
<i>Transactions:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalTxs)}</b>
`;

  return msg;
};
