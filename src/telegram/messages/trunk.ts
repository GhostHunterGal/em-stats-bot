import { BlockchainData } from '../../web3/multicall.js';
import { Calculations } from '../../web3/calculations.js';
import { formatNumberWithSuffix, numFor3 } from '../../utils/formats.js';

export const trunkMsg = (data: BlockchainData, calcs: Calculations): string => {
  const msg = `
<b><a href="https://elephant.money/trunk.html">🟢 TRUNK 🟢</a></b>
  
<i>Launched:</i> <b>${calcs.trunkStart}</b>

<i>Market Cap:</i> <b>$${formatNumberWithSuffix(calcs.trunkMarketCap)}</b>
<i>Total Liquidity:</i> <b>$${formatNumberWithSuffix(
    calcs.totalTrunkLiquidity
  )}</b>  
<i>Total Supply:</i> <b>${formatNumberWithSuffix(data.trunkTotalSupply)}</b>
<i>Burned:</i> <b>${formatNumberWithSuffix(data.trunkBurnBalance)}</b>
<i>Circulating Supply:</i> <b>${formatNumberWithSuffix(
    calcs.circulatingTrunkSupply
  )}</b>
<i>Bertha:</i> <b>${formatNumberWithSuffix(
    data.berthaElephantBalance
  )}</b> <b>($${formatNumberWithSuffix(calcs.berthaValue)})</b>
  
<a href="https://www.geckoterminal.com/bsc/pools/0xf15a72b15fc4caed6fadb1ba7347f6ccd1e0aede">TRUNK/BUSD</a>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(calcs.trunkBusdLiquidity)}</b>
<i>Pooled BUSD:</i> <b>${formatNumberWithSuffix(calcs.trunkBusdReserve1)}</b>
<i>Pooled TRUNK:</i> <b>${formatNumberWithSuffix(calcs.trunkBusdReserve0)}</b>
<i>TRUNK Price:</i> <b>$${numFor3.format(calcs.trunkBusdPrice)}</b>

<a href="https://www.geckoterminal.com/bsc/pools/0xc979b1563b7cf99670b0bc80e960e5004adc2cc6">TRUNK/WBNB</a>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(calcs.trunkWbnbLiquidity)}</b>
<i>Pooled WBNB:</i> <b>${formatNumberWithSuffix(calcs.trunkWbnbReserve0)}</b>
<i>Pooled TRUNK:</i> <b>${formatNumberWithSuffix(calcs.trunkWbnbReserve1)}</b>
<i>TRUNK Price:</i> <b>$${numFor3.format(calcs.trunkWbnbPrice)}</b>
`;

  return msg;
};
