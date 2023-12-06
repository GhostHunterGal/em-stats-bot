import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { formatNumberWithSuffix, numFor2 } from '../../utils/formats';

export const futuresMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  return `
<b><a href="https://elephant.money/futures.html">🪙 FUTURES 🪙</a></b>

<u>BUSD Liabilities</u>
<i>TVL:</i> <b>${formatNumberWithSuffix(calcs.futuresCurrentBalance)}</b>
<i>Daily:</i> <b>${formatNumberWithSuffix(
    calcs.dailyLiabilities
  )} (${numFor2.format(calcs.dailyLiabilitiesAsPercentage)}% of Bertha)</b>

<u>Givers of Yield</u>
<i>BUSD Buffer Pool:</i> <b>${formatNumberWithSuffix(
    Number(data.bufferPoolBusdBalance)
  )}</b>
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    Number(data.berthaElephantBalance)
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValue)})</b>
<i>BUSD Treasury:</i> <b>${formatNumberWithSuffix(
    Number(data.busdTreasuryBusdBalance)
  )}</b>

<u>Activity</u>
<i>Deposits:</i> <b>${formatNumberWithSuffix(
    calcs.futuresTotalDeposited
  )} BUSD</b>
<i>Compounds:</i> <b>${formatNumberWithSuffix(
    calcs.futuresTotalCompoundDeposited
  )} BUSD</b>
<i>Withdrawals:</i> <b>${formatNumberWithSuffix(calcs.withdrawals)} BUSD</b>
<i>Rewards:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalRewards)} BUSD</b>
<i>Participants:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalUsers)}</b>
<i>Transactions:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalTxs)}</b>
`;
};
