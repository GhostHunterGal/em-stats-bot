import { BlockchainData } from './multicall';
import { elephantTotalSupply } from '../web3/contracts';
import { timePassedSince } from '../utils/misc';

export interface Calculations {
  elephantStart: string;
  elephantWbnbReserve0: number;
  elephantWbnbReserve1: number;
  elephantBusdReserve0: number;
  elephantBusdReserve1: number;
  elephantWbnbPricePerMillion: number;
  elephantBusdPricePerMillion: number;
  marketCap: number;
  supplyAdjustedPrice: number;
  elephantWbnbLiquidity: number;
  elephantBusdLiquidity: number;
  totalElephantLiquidity: number;
  berthaValue: number;
  lpElephantBalance: number;
  herdElephantBalance: number;
  trunkStart: string;
  trunkBusdReserve0: number;
  trunkBusdReserve1: number;
  trunkBusdPrice: number;
  trunkBusdLiquidity: number;
  trumpet1stMint: string;
  trumpetTotalUsers: number;
  trumpetTxs: number;
  trumpetUnderlyingSupply: number;
  trumpetSupply: number;
  trumpetPrice: number;
  trumpetDollarPrice: number;
  futures1stDeposit: string;
  futuresTotalUsers: number;
  futuresTotalDeposited: number;
  futuresTotalCompoundDeposited: number;
  futuresTotalRewards: number;
  futuresTotalTxs: number;
  futuresCurrentBalance: number;
  dailyLiabilities: number;
  dailyLiabilitiesAsPercentage: number;
  withdrawals: number;
  nft1stMint: string;
  mintValue: number;
  nftTotalSupplyValue: number;
  minterDepositedValue: number;
  bertha1Percent: number;
  bertha1PercentHighestValue: number;
  bertha1PercentValue: number;
  marketPlaceValue: number;
  nftStakingTotalSupplyValue: number;
  nftStakingRewardsValue: number;
  berthaElephantBalanceAfterMassSell: number;
  berthaValueAfterMassSell: number;
  wbnbLpPercentChange: number;
  busdLpPercentChange: number;
  wbnbLpLiquidityAfterMassSell: number;
  busdLpLiquidityAfterMassSell: number;
  wbnbLpAfterMassSell: number;
  busdLpAfterMassSell: number;
  wbnbLpElephantAfterMassSell: number;
  busdLpElephantAfterMassSell: number;
  newElephantWbnbPrice: number;
  newElephantBusdPrice: number;
}

export const doCalcs = async (data: BlockchainData) => {
  // ELEPHANT DATA
  // const elephantStart = timePassedSince(1620170041);  // 05/04
  const elephantStart = timePassedSince(1620774862); // 05/11

  const [elephantWbnbReserve0, elephantWbnbReserve1] =
    data.elephantWbnbReserves as [number, number];

  const [elephantBusdReserve0, elephantBusdReserve1] =
    data.elephantBusdReserves as [number, number];

  const elephantWbnbRatio = elephantWbnbReserve0 / elephantWbnbReserve1;
  const elephantBusdRatio = elephantBusdReserve1 / elephantBusdReserve0;

  const [elephantWbnbPrice, elephantBusdPrice] = [
    elephantWbnbRatio * Number(data.bnbPrice),
    elephantBusdRatio * Number(data.busdPrice),
  ];

  const elephantWbnbPricePerMillion = elephantWbnbPrice * 1_000_000;
  const elephantBusdPricePerMillion = elephantBusdPrice * 1_000_000;

  const higherElephantPrice = Math.max(elephantWbnbPrice, elephantBusdPrice);

  const marketCap = higherElephantPrice * elephantTotalSupply;

  const supplyAdjustedPrice = marketCap / 21_000_000;

  const elephantWbnbLiquidity =
    elephantWbnbReserve0 * Number(data.bnbPrice) * 2;
  const elephantBusdLiquidity =
    elephantBusdReserve1 * Number(data.busdPrice) * 2;

  const totalElephantLiquidity = elephantWbnbLiquidity + elephantBusdLiquidity;

  const berthaValue = Number(data.berthaElephantBalance) * elephantWbnbPrice;
  const lpElephantBalance = elephantWbnbReserve1 + elephantBusdReserve0;

  const herdElephantBalance =
    elephantTotalSupply -
    Number(data.liquidityDriveEventElephantBalance) -
    Number(data.graveyardElephantBalance) -
    Number(data.berthaElephantBalance) -
    lpElephantBalance;

  // TRUNK DATA
  const trunkStart = timePassedSince(1634606700);

  const [trunkBusdReserve0, trunkBusdReserve1] = data.trunkBusdReserves as [
    number,
    number
  ];

  const trunkBusdRatio = trunkBusdReserve1 / trunkBusdReserve0;

  const trunkBusdPrice = trunkBusdRatio * Number(data.busdPrice);

  const trunkBusdLiquidity: number =
    trunkBusdReserve1 * Number(data.busdPrice) * 2;

  // TRUMPET DATA
  const trumpet1stMint = timePassedSince(1677896068);

  const [
    trumpetTotalUsers,
    trumpetTxs,
    trumpetUnderlyingSupply,
    trumpetSupply,
    trumpetPrice,
  ] = data.trumpetInfo as [number, number, number, number, number];

  const trumpetDollarPrice = trumpetPrice * trunkBusdPrice;

  // FUTURES DATA
  const futures1stDeposit = timePassedSince(1674328800);

  const [
    futuresTotalUsers,
    futuresTotalDeposited,
    futuresTotalCompoundDeposited,
    futuresTotalClaimed,
    futuresTotalRewards,
    futuresTotalTxs,
    futuresCurrentBalance,
  ] = data.futuresInfo as [
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];

  const dailyLiabilities: number = futuresCurrentBalance / 200;
  const withdrawals: number =
    futuresTotalClaimed - futuresTotalCompoundDeposited;

  const dailyLiabilitiesAsPercentage = (dailyLiabilities / berthaValue) * 100;

  // NFT DATA
  const nft1stMint = timePassedSince(1688522727);

  const mintValue = Number(data.unlimitedNftPrice) * Number(data.bnbPrice);
  const marketPlaceValue =
    Number(data.unlimitedNftMarketplacePrice) * Number(data.bnbPrice);

  const bertha1Percent = Number(data.berthaElephantBalance) * 0.01;
  const bertha1PercentValue: number = berthaValue * 0.01;
  const bertha1PercentHighestValue = bertha1Percent * higherElephantPrice;

  const nftStakingRewardsValue =
    Number(data.unlimitedNftStakingTotalRewards) * higherElephantPrice;

  const minterDepositedValue =
    Number(data.unlimitedNftMinterDeposited) * Number(data.bnbPrice);

  const nftTotalSupplyValue =
    Number(data.unlimitedNftTotalSupply) *
    Number(data.bnbPrice) *
    Number(data.unlimitedNftPrice);

  const nftStakingTotalSupplyValue =
    Number(data.unlimitedNftStakingTotalSupply) *
    Number(data.bnbPrice) *
    Number(data.unlimitedNftPrice);

  // STRESS TEST DATA
  const wbnbK = elephantWbnbReserve0 * elephantWbnbReserve1;
  const busdK = elephantBusdReserve0 * elephantBusdReserve1;

  const eightPercentOfHerd = herdElephantBalance * 0.08;
  const herdElephantBalanceAfterfee = herdElephantBalance - eightPercentOfHerd;
  const berthaElephantBalanceAfterMassSell =
    Number(data.berthaElephantBalance) + eightPercentOfHerd;

  const wbnbLpElephantPercentage = elephantWbnbReserve1 / lpElephantBalance;
  const busdLpElephantPercentage = elephantBusdReserve0 / lpElephantBalance;

  const wbnbLpElephantAfterMassSell =
    elephantWbnbReserve1 +
    herdElephantBalanceAfterfee * wbnbLpElephantPercentage;

  const busdLpElephantAfterMassSell =
    elephantBusdReserve0 +
    herdElephantBalanceAfterfee * busdLpElephantPercentage;

  const wbnbLpAfterMassSell = wbnbK / wbnbLpElephantAfterMassSell;
  const busdLpAfterMassSell = busdK / busdLpElephantAfterMassSell;

  const wbnbLpValueAfterMassSell = wbnbLpAfterMassSell * Number(data.bnbPrice);
  const busdLpValueAfterMassSell = busdLpAfterMassSell * Number(data.busdPrice);

  const wbnbLpLiquidityAfterMassSell = wbnbLpValueAfterMassSell * 2;
  const busdLpLiquidityAfterMassSell = busdLpValueAfterMassSell * 2;

  const newElephantWbnbPrice =
    (wbnbLpAfterMassSell / wbnbLpElephantAfterMassSell) *
    Number(data.bnbPrice) *
    1_000_000;

  const newElephantBusdPrice =
    (busdLpAfterMassSell / busdLpElephantAfterMassSell) *
    Number(data.busdPrice) *
    1_000_000;

  const berthaValueAfterMassSell =
    (berthaElephantBalanceAfterMassSell * newElephantWbnbPrice) / 1_000_000;

  const currentWbnbLpValue = elephantWbnbReserve0 * Number(data.bnbPrice);
  const currentBusdLpValue = elephantBusdReserve1 * Number(data.busdPrice);

  const wbnbLpValue = wbnbLpAfterMassSell * Number(data.bnbPrice);
  const busdLpValue = busdLpAfterMassSell * Number(data.busdPrice);

  const wbnbLpPercentChange = (wbnbLpValue / currentWbnbLpValue) * 100;
  const busdLpPercentChange = (busdLpValue / currentBusdLpValue) * 100;

  return {
    elephantStart: elephantStart,
    elephantWbnbReserve0: elephantWbnbReserve0,
    elephantWbnbReserve1: elephantWbnbReserve1,
    elephantBusdReserve0: elephantBusdReserve0,
    elephantBusdReserve1: elephantBusdReserve1,
    elephantWbnbPricePerMillion: elephantWbnbPricePerMillion,
    elephantBusdPricePerMillion: elephantBusdPricePerMillion,
    marketCap: marketCap,
    supplyAdjustedPrice: supplyAdjustedPrice,
    elephantWbnbLiquidity: elephantWbnbLiquidity,
    elephantBusdLiquidity: elephantBusdLiquidity,
    totalElephantLiquidity: totalElephantLiquidity,
    berthaValue: berthaValue,
    lpElephantBalance: lpElephantBalance,
    herdElephantBalance: herdElephantBalance,
    trunkStart: trunkStart,
    trunkBusdReserve0: trunkBusdReserve0,
    trunkBusdReserve1: trunkBusdReserve1,
    trunkBusdPrice: trunkBusdPrice,
    trunkBusdLiquidity: trunkBusdLiquidity,
    trumpet1stMint: trumpet1stMint,
    trumpetTotalUsers: trumpetTotalUsers,
    trumpetTxs: trumpetTxs,
    trumpetUnderlyingSupply: trumpetUnderlyingSupply,
    trumpetSupply: trumpetSupply,
    trumpetPrice: trumpetPrice,
    trumpetDollarPrice: trumpetDollarPrice,
    futures1stDeposit: futures1stDeposit,
    futuresTotalUsers: futuresTotalUsers,
    futuresTotalDeposited: futuresTotalDeposited,
    futuresTotalCompoundDeposited: futuresTotalCompoundDeposited,
    futuresTotalRewards: futuresTotalRewards,
    futuresTotalTxs: futuresTotalTxs,
    futuresCurrentBalance: futuresCurrentBalance,
    dailyLiabilities: dailyLiabilities,
    dailyLiabilitiesAsPercentage: dailyLiabilitiesAsPercentage,
    withdrawals: withdrawals,
    mintValue: mintValue,
    nft1stMint: nft1stMint,
    nftTotalSupplyValue: nftTotalSupplyValue,
    minterDepositedValue: minterDepositedValue,
    bertha1Percent: bertha1Percent,
    bertha1PercentHighestValue: bertha1PercentHighestValue,
    bertha1PercentValue: bertha1PercentValue,
    marketPlaceValue: marketPlaceValue,
    nftStakingTotalSupplyValue: nftStakingTotalSupplyValue,
    nftStakingRewardsValue: nftStakingRewardsValue,
    berthaElephantBalanceAfterMassSell: berthaElephantBalanceAfterMassSell,
    berthaValueAfterMassSell: berthaValueAfterMassSell,
    wbnbLpPercentChange: wbnbLpPercentChange,
    busdLpPercentChange: busdLpPercentChange,
    wbnbLpLiquidityAfterMassSell: wbnbLpLiquidityAfterMassSell,
    busdLpLiquidityAfterMassSell: busdLpLiquidityAfterMassSell,
    wbnbLpAfterMassSell: wbnbLpAfterMassSell,
    busdLpAfterMassSell: busdLpAfterMassSell,
    wbnbLpElephantAfterMassSell: wbnbLpElephantAfterMassSell,
    busdLpElephantAfterMassSell: busdLpElephantAfterMassSell,
    newElephantWbnbPrice: newElephantWbnbPrice,
    newElephantBusdPrice: newElephantBusdPrice,
  };
};
