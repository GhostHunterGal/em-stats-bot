import { BlockchainData } from './multicall.js';
import { elephantTotalSupply } from '../web3/contracts.js';
import { timePassedSince } from '../utils/misc.js';

export interface Calculations {
  elephantStart: string;
  elephantWbnbReserve0: number;
  elephantWbnbReserve1: number;
  elephantBusdReserve0: number;
  elephantBusdReserve1: number;
  elephantWbnbPricePerMillion: number;
  elephantBusdPricePerMillion: number;
  elephantMarketCap: number;
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
  trunkWbnbReserve0: number;
  trunkWbnbReserve1: number;
  trunkWbnbPrice: number;
  trunkWbnbLiquidity: number;
  trunkMarketCap: number;
  totalTrunkLiquidity: number;
  higherTrunkPrice: number;
  circulatingTrunkSupply: number;
  trumpet1stMint: string;
  trumpetTotalUsers: number;
  trumpetTxs: number;
  trumpetUnderlyingSupply: number;
  trumpetSupply: number;
  trumpetPrice: number;
  trumpetAvailableSweep: number;
  trumpetAvailableSweepValue: number;
  trumpetDollarPrice: number;
  futures1stDeposit: string;
  futuresTotalUsers: number;
  futuresTotalDeposited: number;
  futuresTotalCompoundDeposited: number;
  futuresTotalTxs: number;
  futuresCurrentBalance: number;
  dailyFuturesLiabilities: number;
  dailyFuturesLiabilitiesVsBnbReserve: number;
  futuresWithdrawals: number;
  bnbReserveValue: number;
  bnbReserveStrategyAvailableSweep: number;
  bnbReserveStrategyAvailableSweepValue: number;
  decayBufferDays: number;
  nft1stMint: string;
  nftMintValue: number;
  nftTotalSupplyValue: number;
  nftMinterDepositedTotal: number;
  nftMinterBusdDepositedTotal: number;
  nftAvailableSweep: number;
  nftAvailableSweepValue: number;
  nftStakingApr: number;
  bertha1Percent: number;
  bertha1PercentHighestValue: number;
  bertha1PercentValue: number;
  nftMarketPlaceValue: number;
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
  // futuresTotalDeposited24HourDifference: number;
  // futuresTotalCompoundDeposited24HourDifference: number;
  // futuresWithdrawals24HourDifference: number;
  // futuresTotalUsers24HourDifference: number;
  // futuresTotalTxs24HourDifference: number;
  // trumpetTotalUsers24HourDifference: number;
  // trumpetTxs24HourDifference: number;
  rainyDayFundValue: number;
  btcTurbineValue: number;
  trunkTurbineValue: number;
}

export const doCalcs = async (data: BlockchainData) => {
  const elephantStart = timePassedSince(1620774862);

  const [elephantWbnbReserve0, elephantWbnbReserve1] =
    data.elephantWbnbReserves;
  const [elephantBusdReserve0, elephantBusdReserve1] =
    data.elephantBusdReserves;

  const [elephantWbnbRatio, elephantBusdRatio] = [
    elephantWbnbReserve0 / elephantWbnbReserve1,
    elephantBusdReserve1 / elephantBusdReserve0,
  ];

  const [elephantWbnbPrice, elephantBusdPrice] = [
    elephantWbnbRatio * data.bnbPrice,
    elephantBusdRatio * data.busdPrice,
  ];

  const [elephantWbnbPricePerMillion, elephantBusdPricePerMillion] = [
    elephantWbnbPrice * 1_000_000,
    elephantBusdPrice * 1_000_000,
  ];

  const higherElephantPrice = Math.max(elephantWbnbPrice, elephantBusdPrice);
  const elephantMarketCap = higherElephantPrice * elephantTotalSupply;
  const supplyAdjustedPrice = elephantMarketCap / 21_000_000;

  const [elephantWbnbLiquidity, elephantBusdLiquidity] = [
    elephantWbnbReserve0 * data.bnbPrice * 2,
    elephantBusdReserve1 * data.busdPrice * 2,
  ];

  const totalElephantLiquidity = elephantWbnbLiquidity + elephantBusdLiquidity;

  const berthaValue = data.berthaElephantBalance * elephantWbnbPrice;
  const lpElephantBalance = elephantWbnbReserve1 + elephantBusdReserve0;

  const herdElephantBalance =
    elephantTotalSupply -
    data.liquidityDriveEventElephantBalance -
    data.graveyardElephantBalance -
    data.berthaElephantBalance -
    lpElephantBalance;

  const trunkStart = timePassedSince(1634606700);

  const [trunkBusdReserve0, trunkBusdReserve1] = data.trunkBusdReserves;
  const [trunkWbnbReserve0, trunkWbnbReserve1] = data.trunkWbnbReserves;

  const [trunkBusdRatio, trunkWbnbRatio] = [
    trunkBusdReserve1 / trunkBusdReserve0,
    trunkWbnbReserve0 / trunkWbnbReserve1,
  ];
  const [trunkBusdPrice, trunkWbnbPrice] = [
    trunkBusdRatio * data.busdPrice,
    trunkWbnbRatio * data.bnbPrice,
  ];
  const [trunkBusdLiquidity, trunkWbnbLiquidity] = [
    trunkBusdReserve1 * data.busdPrice * 2,
    trunkWbnbReserve0 * data.bnbPrice * 2,
  ];

  const higherTrunkPrice = Math.max(trunkWbnbPrice, trunkBusdPrice);
  const trunkMarketCap = higherTrunkPrice * data.trunkTotalSupply;
  const totalTrunkLiquidity = trunkWbnbLiquidity + trunkBusdLiquidity;
  const circulatingTrunkSupply = data.trunkTotalSupply - data.trunkBurnBalance;

  const trumpet1stMint = timePassedSince(1677896068);

  const [
    trumpetTotalUsers,
    trumpetTxs,
    trumpetUnderlyingSupply,
    trumpetSupply,
    trumpetPrice,
  ] = data.trumpetInfo;

  const trumpetDollarPrice = trumpetPrice * higherTrunkPrice;

  const [trumpetAvailableSweep] = data.pegSupportTreasuryStrategyAvailable;
  const trumpetAvailableSweepValue = trumpetAvailableSweep * elephantWbnbPrice;

  // const [
  //   trumpetTotalUsers24HoursAgo,
  //   trumpetTxs24HoursAgo,
  //   trumpetUnderlyingSupply24HoursAgo,
  //   trumpetSupply24HoursAgo,
  //   trumpetPrice24HoursAgo,
  // ] = data.trumpetInfo24HoursAgo;

  // const [trumpetTotalUsers24HourDifference, trumpetTxs24HourDifference] = [
  //   trumpetTotalUsers - trumpetTotalUsers24HoursAgo,
  //   trumpetTxs - trumpetTxs24HoursAgo,
  // ];

  const futures1stDeposit = timePassedSince(1674328800);

  const [
    futuresTotalUsers,
    futuresTotalDeposited,
    futuresTotalCompoundDeposited,
    futuresTotalClaimed,
    futuresTotalRewards,
    futuresTotalTxs,
    futuresCurrentBalance,
  ] = data.futuresInfo;

  const dailyFuturesLiabilities = 0.005 * futuresCurrentBalance;

  const futuresWithdrawals =
    futuresTotalClaimed - futuresTotalCompoundDeposited;

  const bnbReserveValue = data.bnbReserveBnbBalance * data.bnbPrice;
  const rainyDayFundValue = data.rainyDayFundBnbBalance * data.bnbPrice;

  const btcTurbineValue = data.btcTurbineBtcBalance * data.btcPrice;
  const trunkTurbineValue = data.trunkTurbineTrunkBalance * higherTrunkPrice;

  const [bnbReserveStrategyAvailableSweep] = data.bnbReserveStrategyAvailable;
  const bnbReserveStrategyAvailableSweepValue =
    bnbReserveStrategyAvailableSweep * elephantWbnbPrice;

  const dailyFuturesLiabilitiesVsBnbReserve =
    (bnbReserveValue / dailyFuturesLiabilities) * 100;

  const decayRate = 0.5 / 45;

  const decayBufferDays = data.futuresDailyYield / decayRate;

  // const [
  //   futuresTotalUsers24HoursAgo,
  //   futuresTotalDeposited24HoursAgo,
  //   futuresTotalCompoundDeposited24HoursAgo,
  //   futuresTotalClaimed24HoursAgo,
  //   futuresTotalRewards24HoursAgo,
  //   futuresTotalTxs24HoursAgo,
  //   futuresCurrentBalance24HoursAgo,
  // ] = data.futuresInfo24HoursAgo;

  // const futuresWithdrawals24HoursAgo =
  //   futuresTotalClaimed24HoursAgo - futuresTotalCompoundDeposited24HoursAgo;

  // const [
  //   futuresTotalUsers24HourDifference,
  //   futuresTotalDeposited24HourDifference,
  //   futuresTotalCompoundDeposited24HourDifference,
  //   futuresWithdrawals24HourDifference,
  //   futuresTotalTxs24HourDifference,
  // ] = [
  //   futuresTotalUsers - futuresTotalUsers24HoursAgo,
  //   futuresTotalDeposited - futuresTotalDeposited24HoursAgo,
  //   futuresTotalCompoundDeposited - futuresTotalCompoundDeposited24HoursAgo,
  //   futuresWithdrawals - futuresWithdrawals24HoursAgo,
  //   futuresTotalTxs - futuresTotalTxs24HoursAgo,
  // ];

  const nft1stMint = timePassedSince(1688522727);

  const nftMintValue = data.unlimitedNftPrice * data.bnbPrice;
  const nftMarketPlaceValue = data.unlimitedNftMarketplacePrice * data.bnbPrice;

  const bertha1Percent = data.berthaElephantBalance * 0.01;
  const bertha1PercentValue = berthaValue * 0.01;
  const bertha1PercentHighestValue = bertha1Percent * higherElephantPrice;

  const nftStakingRewardsValue =
    data.unlimitedNftStakingTotalRewards * higherElephantPrice;

  const roun1Mints = 9000;
  const roun2Mints = 5_432;

  const nftMinterDepositedTotal =
    data.unlimitedNftMinterDeposited + roun1Mints + roun2Mints;

  const nftMinterBusdDepositedDa38 = 3_281_444.207375890194271921;
  const nftMinterBusdDepositedD875 = 94_807.57082782;
  const nftMinterBusdDepositedBACD = 128_748.13913694;

  const nftMinterBusdDepositedTotal =
    data.unlimitedNftMinterBusdDeposited +
    nftMinterBusdDepositedDa38 +
    nftMinterBusdDepositedD875 +
    nftMinterBusdDepositedBACD;

  const nftTotalSupplyValue =
    data.unlimitedNftTotalSupply * data.bnbPrice * data.unlimitedNftPrice;

  const nftStakingTotalSupplyValue =
    data.unlimitedNftStakingTotalSupply *
    data.bnbPrice *
    data.unlimitedNftPrice;

  const [nftAvailableSweep] = data.aprForwardAvailable;
  const nftAvailableSweepValue = nftAvailableSweep * elephantWbnbPrice;

  const [, nftDailyEstimate] = data.aprForwardDailyEstimate;

  const nftStakingApr =
    ((nftDailyEstimate * 365) / nftMinterBusdDepositedTotal) * 100;

  const [wbnbK, busdK] = [
    elephantWbnbReserve0 * elephantWbnbReserve1,
    elephantBusdReserve0 * elephantBusdReserve1,
  ];

  const eightPercentOfHerd = herdElephantBalance * 0.08;
  const herdElephantBalanceAfterfee = herdElephantBalance - eightPercentOfHerd;
  const berthaElephantBalanceAfterMassSell =
    data.berthaElephantBalance + eightPercentOfHerd;

  const [wbnbLpElephantPercentage, busdLpElephantPercentage] = [
    elephantWbnbReserve1 / lpElephantBalance,
    elephantBusdReserve0 / lpElephantBalance,
  ];

  const [wbnbLpElephantAfterMassSell, busdLpElephantAfterMassSell] = [
    elephantWbnbReserve1 +
      herdElephantBalanceAfterfee * wbnbLpElephantPercentage,
    elephantBusdReserve0 +
      herdElephantBalanceAfterfee * busdLpElephantPercentage,
  ];

  const [wbnbLpAfterMassSell, busdLpAfterMassSell] = [
    wbnbK / wbnbLpElephantAfterMassSell,
    busdK / busdLpElephantAfterMassSell,
  ];

  const [wbnbLpValueAfterMassSell, busdLpValueAfterMassSell] = [
    wbnbLpAfterMassSell * data.bnbPrice,
    busdLpAfterMassSell * data.busdPrice,
  ];

  const [wbnbLpLiquidityAfterMassSell, busdLpLiquidityAfterMassSell] = [
    wbnbLpValueAfterMassSell * 2,
    busdLpValueAfterMassSell * 2,
  ];

  const [newElephantWbnbPrice, newElephantBusdPrice] = [
    (wbnbLpAfterMassSell / wbnbLpElephantAfterMassSell) *
      data.bnbPrice *
      1_000_000,
    (busdLpAfterMassSell / busdLpElephantAfterMassSell) *
      data.busdPrice *
      1_000_000,
  ];

  const berthaValueAfterMassSell =
    (berthaElephantBalanceAfterMassSell * newElephantWbnbPrice) / 1_000_000;

  const [currentWbnbLpValue, currentBusdLpValue] = [
    elephantWbnbReserve0 * data.bnbPrice,
    elephantBusdReserve1 * data.busdPrice,
  ];

  const [wbnbLpValue, busdLpValue] = [
    wbnbLpAfterMassSell * data.bnbPrice,
    busdLpAfterMassSell * data.busdPrice,
  ];

  const [wbnbLpPercentChange, busdLpPercentChange] = [
    (wbnbLpValue / currentWbnbLpValue) * 100,
    (busdLpValue / currentBusdLpValue) * 100,
  ];

  return {
    elephantStart: elephantStart,
    elephantWbnbReserve0: elephantWbnbReserve0,
    elephantWbnbReserve1: elephantWbnbReserve1,
    elephantBusdReserve0: elephantBusdReserve0,
    elephantBusdReserve1: elephantBusdReserve1,
    elephantWbnbPricePerMillion: elephantWbnbPricePerMillion,
    elephantBusdPricePerMillion: elephantBusdPricePerMillion,
    elephantMarketCap: elephantMarketCap,
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
    trunkWbnbReserve0: trunkWbnbReserve0,
    trunkWbnbReserve1: trunkWbnbReserve1,
    trunkWbnbPrice: trunkWbnbPrice,
    trunkWbnbLiquidity: trunkWbnbLiquidity,
    trunkMarketCap: trunkMarketCap,
    totalTrunkLiquidity: totalTrunkLiquidity,
    higherTrunkPrice: higherTrunkPrice,
    circulatingTrunkSupply: circulatingTrunkSupply,
    trumpet1stMint: trumpet1stMint,
    trumpetTotalUsers: trumpetTotalUsers,
    trumpetTxs: trumpetTxs,
    trumpetUnderlyingSupply: trumpetUnderlyingSupply,
    trumpetSupply: trumpetSupply,
    trumpetPrice: trumpetPrice,
    trumpetDollarPrice: trumpetDollarPrice,
    trumpetAvailableSweep: trumpetAvailableSweep,
    trumpetAvailableSweepValue: trumpetAvailableSweepValue,
    futures1stDeposit: futures1stDeposit,
    futuresTotalUsers: futuresTotalUsers,
    futuresTotalDeposited: futuresTotalDeposited,
    futuresTotalCompoundDeposited: futuresTotalCompoundDeposited,
    futuresTotalTxs: futuresTotalTxs,
    futuresCurrentBalance: futuresCurrentBalance,
    dailyFuturesLiabilities: dailyFuturesLiabilities,
    dailyFuturesLiabilitiesVsBnbReserve: dailyFuturesLiabilitiesVsBnbReserve,
    futuresWithdrawals: futuresWithdrawals,
    bnbReserveValue: bnbReserveValue,
    bnbReserveStrategyAvailableSweep: bnbReserveStrategyAvailableSweep,
    bnbReserveStrategyAvailableSweepValue:
      bnbReserveStrategyAvailableSweepValue,
    decayBufferDays: decayBufferDays,
    nftMintValue: nftMintValue,
    nft1stMint: nft1stMint,
    nftTotalSupplyValue: nftTotalSupplyValue,
    nftMinterDepositedTotal: nftMinterDepositedTotal,
    nftMinterBusdDepositedTotal: nftMinterBusdDepositedTotal,
    nftAvailableSweep: nftAvailableSweep,
    nftAvailableSweepValue: nftAvailableSweepValue,
    bertha1Percent: bertha1Percent,
    bertha1PercentHighestValue: bertha1PercentHighestValue,
    bertha1PercentValue: bertha1PercentValue,
    nftMarketPlaceValue: nftMarketPlaceValue,
    nftStakingTotalSupplyValue: nftStakingTotalSupplyValue,
    nftStakingRewardsValue: nftStakingRewardsValue,
    nftStakingApr: nftStakingApr,
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
    // futuresTotalDeposited24HourDifference:
    //   futuresTotalDeposited24HourDifference,
    // futuresTotalCompoundDeposited24HourDifference:
    //   futuresTotalCompoundDeposited24HourDifference,
    // futuresWithdrawals24HourDifference: futuresWithdrawals24HourDifference,
    // futuresTotalUsers24HourDifference: futuresTotalUsers24HourDifference,
    // futuresTotalTxs24HourDifference: futuresTotalTxs24HourDifference,
    // trumpetTotalUsers24HourDifference: trumpetTotalUsers24HourDifference,
    // trumpetTxs24HourDifference: trumpetTxs24HourDifference,
    rainyDayFundValue: rainyDayFundValue,
    btcTurbineValue: btcTurbineValue,
    trunkTurbineValue: trunkTurbineValue,
  };
};
