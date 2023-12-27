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
  dailyFuturesLiabilities: number;
  dailyFuturesLiabilitiesAsPercentage: number;
  futuresWithdrawals: number;
  bnbReserveValue: number;
  futuresDailyYield: number;
  nft1stMint: string;
  nftMintValue: number;
  nftTotalSupplyValue: number;
  nftMinterDepositedTotal: number;
  nftMinterDepositedValue: number;
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
}

export const doCalcs = async (data: BlockchainData) => {
  // ELEPHANT DATA
  // const elephantStart = timePassedSince(1620170041);  // 05/04
  const elephantStart = timePassedSince(1620774862); // 05/11

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

  // TRUNK DATA
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

  // TRUMPET DATA
  const trumpet1stMint = timePassedSince(1677896068);

  const [
    trumpetTotalUsers,
    trumpetTxs,
    trumpetUnderlyingSupply,
    trumpetSupply,
    trumpetPrice,
  ] = data.trumpetInfo;

  const trumpetDollarPrice = trumpetPrice * higherTrunkPrice;

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
  ] = data.futuresInfo;

  const dailyFuturesLiabilities = futuresCurrentBalance / 200;
  const futuresWithdrawals =
    futuresTotalClaimed - futuresTotalCompoundDeposited;

  const dailyFuturesLiabilitiesAsPercentage =
    (dailyFuturesLiabilities / berthaValue) * 100;

  const bnbReserveValue = data.bnbReserveBnbBalance * data.bnbPrice;

  const futuresDailyYield = 0.5 * (bnbReserveValue / dailyFuturesLiabilities);

  // NFT DATA
  const nft1stMint = timePassedSince(1688522727);

  const nftMintValue = data.unlimitedNftPrice * data.bnbPrice;
  const nftMarketPlaceValue = data.unlimitedNftMarketplacePrice * data.bnbPrice;

  const bertha1Percent = data.berthaElephantBalance * 0.01;
  const bertha1PercentValue = berthaValue * 0.01;
  const bertha1PercentHighestValue = bertha1Percent * higherElephantPrice;

  const nftStakingRewardsValue =
    data.unlimitedNftStakingTotalRewards * higherElephantPrice;

  const nftMinterDepositedDa38Amount = 14_142; //0x811d1b27A18383B7421bDdE1cb81c55609f1Da38
  const nftMinterDepositedD875Amount = 358; //0x825055A405d88cF2A844DB3e3dae6dA53774D875
  const nftMinterDepositedBACDAmount = 496; //0xB3A23fCDB4165e1BBeF5263546e653B58c8fBACD

  const nftMinterDepositedTotal =
    data.unlimitedNftMinterDeposited +
    nftMinterDepositedDa38Amount +
    nftMinterDepositedD875Amount +
    nftMinterDepositedBACDAmount;

  const nftMinterDepositedValue = nftMinterDepositedTotal * data.bnbPrice;

  const nftTotalSupplyValue =
    data.unlimitedNftTotalSupply * data.bnbPrice * data.unlimitedNftPrice;

  const nftStakingTotalSupplyValue =
    data.unlimitedNftStakingTotalSupply *
    data.bnbPrice *
    data.unlimitedNftPrice;

  // STRESS TEST DATA
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
    dailyFuturesLiabilities: dailyFuturesLiabilities,
    dailyFuturesLiabilitiesAsPercentage: dailyFuturesLiabilitiesAsPercentage,
    futuresWithdrawals: futuresWithdrawals,
    bnbReserveValue: bnbReserveValue,
    futuresDailyYield: futuresDailyYield,
    nftMintValue: nftMintValue,
    nft1stMint: nft1stMint,
    nftTotalSupplyValue: nftTotalSupplyValue,
    nftMinterDepositedTotal: nftMinterDepositedTotal,
    nftMinterDepositedValue: nftMinterDepositedValue,
    bertha1Percent: bertha1Percent,
    bertha1PercentHighestValue: bertha1PercentHighestValue,
    bertha1PercentValue: bertha1PercentValue,
    nftMarketPlaceValue: nftMarketPlaceValue,
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
