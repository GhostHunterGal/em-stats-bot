import { BlockchainData } from '../../web3/multicall.js';
import { Calculations } from '../../web3/calculations.js';
import {
  formatNumberWithSuffix,
  numFor2,
  numFor3,
} from '../../utils/formats.js';

export const futuresMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg = `
<b><a href="https://elephant.money/futures.html">🪙 FUTURES 🪙</a></b>
  
<i>1st Deposit:</i> <b>${calcs.futures1stDeposit}</b>

<i>BNB Price:</i> <b>$${numFor2.format(data.bnbPrice)}</b>
  
<u>Liabilities</u>
<i>TVL:</i> <b>$${formatNumberWithSuffix(calcs.futuresCurrentBalance)}</b>
<i>Daily:</i> <b>$${formatNumberWithSuffix(calcs.dailyFuturesLiabilities)}</b>
<i>BNB Reserve/Daily:</i> <b>${numFor2.format(
    calcs.dailyFuturesLiabilitiesVsBnbReserve
  )}%</b>
<i>Base Yield:</i> <b>${numFor3
    .format(data.futuresDailyYield)
    .replace('0.500', '0.5')}% (${numFor3.format(
    data.futuresAnnualYield
  )}% APR)</b>
<i>Decay Buffer:</i> <b>${numFor2.format(calcs.decayBufferDays)} day${
    calcs.decayBufferDays !== 1 ? 's' : ''
  }</b>
  
<u>Givers of Yield</u>
<i>BNB Reserve:</i> <b>${formatNumberWithSuffix(
    data.bnbReserveBnbBalance
  )} ($${formatNumberWithSuffix(calcs.bnbReserveValue)})</b>
<i>Sweep:</i> <b>${formatNumberWithSuffix(
    calcs.bnbReserveStrategyAvailableSweep
  )} ($${formatNumberWithSuffix(
    calcs.bnbReserveStrategyAvailableSweepValue
  )})</b>
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    data.berthaElephantBalance
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValue)})</b>
<i>RDF:</i> <b>${formatNumberWithSuffix(
    data.rainyDayFundBnbBalance
  )} BNB ($${formatNumberWithSuffix(calcs.rainyDayFundValue)})</b>

<i>BTC Turbine:</i> <b>${formatNumberWithSuffix(
    data.btcTurbineBtcBalance
  )} ($${formatNumberWithSuffix(calcs.btcTurbineValue)})</b>
<i>TRUNK Turbine:</i> <b>${formatNumberWithSuffix(
    data.trunkTurbineTrunkBalance
  )} ($${formatNumberWithSuffix(calcs.trunkTurbineValue)})</b>
  
<u>Activity</u>
<i>Deposits:</i> <b>$${formatNumberWithSuffix(calcs.futuresTotalDeposited)}</b>
<i>Compounds:</i> <b>$${formatNumberWithSuffix(
    calcs.futuresTotalCompoundDeposited
  )}</b>
<i>Withdrawals:</i> <b>$${formatNumberWithSuffix(calcs.futuresWithdrawals)}</b>
<i>Participants:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalUsers)}</b>
<i>Transactions:</i> <b>${formatNumberWithSuffix(calcs.futuresTotalTxs)}</b>
`;

  return msg;
};
