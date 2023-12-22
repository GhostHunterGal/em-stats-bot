import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import {
  numFor9,
  formatNumberWithSuffix,
  numFor2,
} from '../../utils/formats.js';

export const stressTestMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg = `
<b><a href="https://youtu.be/xR3vV7WbUI4">🧮 EMH STRESS TEST 🧮</a></b>
  
If the Herd sold <b>${formatNumberWithSuffix(
    calcs.herdElephantBalance
  )}</b> ELEPHANT
  
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    calcs.berthaElephantBalanceAfterMassSell
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValueAfterMassSell)})</b>
  
<u>ELEPHANT/BUSD</u>
<i>Retained:</i> <b>${numFor2.format(calcs.busdLpPercentChange)}%</b>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(
    calcs.busdLpLiquidityAfterMassSell
  )}</b>
<i>Pooled BUSD:</i> <b>${formatNumberWithSuffix(calcs.busdLpAfterMassSell)}</b>
<i>Pooled ELE:</i> <b>${formatNumberWithSuffix(
    calcs.busdLpElephantAfterMassSell
  )}</b>
<i>Price/1M ELE:</i> <b>$${numFor9.format(calcs.newElephantBusdPrice)}</b>
  
<u>ELEPHANT/WBNB</u>
<i>Retained:</i> <b>${numFor2.format(calcs.wbnbLpPercentChange)}%</b>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(
    calcs.wbnbLpLiquidityAfterMassSell
  )}</b>
<i>Pooled WBNB:</i> <b>${formatNumberWithSuffix(calcs.wbnbLpAfterMassSell)}</b>
<i>Pooled ELE:</i> <b>${formatNumberWithSuffix(
    calcs.wbnbLpElephantAfterMassSell
  )}</b>
<i>Price/1M ELE:</i> <b>$${numFor9.format(calcs.newElephantWbnbPrice)}</b>
  
<i>BNB Price:</i> <b>$${numFor2.format(data.bnbPrice)}</b>
`;

  return msg;
};
