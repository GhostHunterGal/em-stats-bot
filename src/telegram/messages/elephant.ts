import { BlockchainData } from '../../web3/multicall';
import { elephantTotalSupply } from '../../web3/contracts';
import { Calculations } from '../../web3/calculations';
import {
  numFor9,
  numFor2,
  numFor3,
  formatNumberWithSuffix,
} from '../../utils/formats';

export const elephantMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const distribution = [
    {
      label: 'Bertha',
      elephantBalance: data.berthaElephantBalance,
    },
    {
      label: 'Graveyard',
      elephantBalance: data.graveyardElephantBalance,
    },
    {
      label: 'LPs',
      elephantBalance: calcs.lpElephantBalance,
    },
    {
      label: 'Herd',
      elephantBalance: calcs.herdElephantBalance,
    },
    {
      label: 'LDE',
      elephantBalance: data.liquidityDriveEventElephantBalance,
    },
  ];

  distribution.sort((a, b) => b.elephantBalance - a.elephantBalance);

  const formattedDistribution = distribution
    .map((item) => {
      const percentage = (item.elephantBalance / elephantTotalSupply) * 100;
      return `<i>${item.label}:</i> <b>${formatNumberWithSuffix(
        item.elephantBalance
      )}</b> <b>(${numFor3.format(percentage)}%)</b>`;
    })
    .join('\n');

  const msg = `
<b><a href="https://elephant.money/dashboard.html">🐘 ELEPHANT MONEY 🐘</a></b>
    
<i>Launched:</i> <b>${calcs.elephantStart}</b>
    
<i>Market Cap:</i> <b>$${formatNumberWithSuffix(calcs.elephantMarketCap)}</b>
<i>Total Liquidity:</i> <b>$${formatNumberWithSuffix(
    calcs.totalElephantLiquidity
  )}</b>
<i>21M SA Price:</i> <b>$${numFor2.format(calcs.supplyAdjustedPrice)}</b>
<i>Bertha:</i> <b>$${formatNumberWithSuffix(calcs.berthaValue)}</b>
    
<u>Distribution</u>
${formattedDistribution}
    
<a href="https://www.geckoterminal.com/bsc/pools/0x647bc907d520c3f63be38d01dbd979f5606bec48">ELEPHANT/BUSD</a>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(calcs.elephantBusdLiquidity)}</b>
<i>Pooled BUSD:</i> <b>${formatNumberWithSuffix(calcs.elephantBusdReserve1)}</b>
<i>Pooled ELE:</i> <b>${formatNumberWithSuffix(calcs.elephantBusdReserve0)}</b>
<i>Price/1M ELE:</i> <b>$${numFor9.format(
    calcs.elephantBusdPricePerMillion
  )}</b>
    
<a href="https://www.geckoterminal.com/bsc/pools/0x1cea83ec5e48d9157fcae27a19807bef79195ce1">ELEPHANT/WBNB</a>
<i>Liquidity:</i> <b>$${formatNumberWithSuffix(calcs.elephantWbnbLiquidity)}</b>
<i>Pooled WBNB:</i> <b>${formatNumberWithSuffix(calcs.elephantWbnbReserve0)}</b>
<i>Pooled ELE:</i> <b>${formatNumberWithSuffix(calcs.elephantWbnbReserve1)}</b>
<i>Price/1M ELE:</i> <b>$${numFor9.format(
    calcs.elephantWbnbPricePerMillion
  )}</b>
    
<i>BNB Price:</i> <b>$${numFor2.format(data.bnbPrice)}</b>
`;

  return msg;
};
