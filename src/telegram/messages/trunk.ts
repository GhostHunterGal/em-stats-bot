import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { formatNumberWithSuffix, numFor3 } from '../../utils/formats';

export const trunkMsg = (data: BlockchainData, calcs: Calculations): string => {
  const msg = `
<b><a href="https://elephant.money/trunk.html">🟢 TRUNK 🟢</a></b>
  
<i>Launched:</i> <b>${calcs.trunkStart}</b>
  
<i>TRUNK Total Supply:</i> <b>${formatNumberWithSuffix(
    data.trunkTotalSupply
  )}</b>
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    data.berthaElephantBalance
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValue)})</b>
  
<a href="https://www.geckoterminal.com/bsc/pools/0xf15a72b15fc4caed6fadb1ba7347f6ccd1e0aede">TRUNK/BUSD</a>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(calcs.trunkBusdLiquidity)}</b>
<i>Pooled BUSD:</i> <b>${formatNumberWithSuffix(calcs.trunkBusdReserve1)}</b>
<i>Pooled TRUNK:</i> <b>${formatNumberWithSuffix(calcs.trunkBusdReserve0)}</b>
<i>TRUNK Price:</i> <b>$${numFor3.format(calcs.trunkBusdPrice)}</b>
`;

  return msg;
};
