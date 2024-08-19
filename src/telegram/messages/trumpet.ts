import { Calculations } from '../../web3/calculations.js';
import {
  formatNumberWithSuffix,
  numFor2,
  numFor3,
} from '../../utils/formats.js';

export const trumpetMsg = (calcs: Calculations): string => {
  const msg = `
<b><a href="https://elephant.money/trumpet.html">🎺 TRUMPET 🎺</a></b>
  
<i>1st Mint:</i> <b>${calcs.trumpet1stMint}</b>
  
<i>TRUNK Price:</i> <b>$${numFor3.format(calcs.higherTrunkPrice)}</b>
  
<i>Backed Supply:</i> <b>${formatNumberWithSuffix(
    calcs.trumpetUnderlyingSupply
  )} TRUNK</b>
<i>Trumpet Supply:</i> <b>${formatNumberWithSuffix(calcs.trumpetSupply)}</b>
<i>TRUNK/TRUMPET:</i> <b>${numFor3.format(
    calcs.trumpetPrice
  )} ($${numFor2.format(calcs.trumpetDollarPrice)})</b>
<i>Sweep:</i> <b>${formatNumberWithSuffix(
    calcs.trumpetAvailableSweep
  )} ($${formatNumberWithSuffix(calcs.trumpetAvailableSweepValue)})</b>
  
<u>Activity</u>
<i>Participants:</i> <b>${formatNumberWithSuffix(calcs.trumpetTotalUsers)}</b>
<i>Transactions:</i> <b>${formatNumberWithSuffix(calcs.trumpetTxs)}</b>
`;

  return msg;
};
