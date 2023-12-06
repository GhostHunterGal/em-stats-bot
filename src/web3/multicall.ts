import { client } from './client';
import { contracts, erc20Abi } from './contracts';
import { format } from '../utils/formats';

export interface BlockchainData {
  bnbPrice: number | number[] | undefined;
  busdPrice: number | number[] | undefined;
  graveyardElephantBalance: number | number[] | undefined;
  berthaElephantBalance: number | number[] | undefined;
  liquidityDriveEventElephantBalance: number | number[] | undefined;
  openLeverageElephantBalance: number | number[] | undefined;
  elephantWbnbReserves: number | number[] | undefined;
  elephantBusdReserves: number | number[] | undefined;
  trunkTotalSupply: number | number[] | undefined;
  trunkTreasuryBalance: number | number[] | undefined;
  trunkBusdReserves: number | number[] | undefined;
  unlimitedNftPrice: number | number[] | undefined;
  unlimitedNftTotalSupply: number | number[] | undefined;
  unlimitedNftMinterDeposited: number | number[] | undefined;
  unlimitedNftStakingTotalRewards: number | number[] | undefined;
  unlimitedNftStakingTotalSupply: number | number[] | undefined;
  unlimitedNftMarketplacePrice: number | number[] | undefined;
  unlimitedNftMarketplaceTotalRevenue: number | number[] | undefined;
  unlimitedNftMarketplaceTotalSales: number | number[] | undefined;
  unlimitedNftMarketplaceTotalSupply: number | number[] | undefined;
  futuresInfo: number | number[] | undefined;
  bufferPoolBusdBalance: number | number[] | undefined;
  busdTreasuryBusdBalance: number | number[] | undefined;
  trumpetInfo: number | number[] | undefined;
}

export const getBlockchainData = async () => {
  const results = await client.multicall({
    contracts: [
      {
        ...contracts.chainlinkBnb,
        functionName: 'latestAnswer',
      },
      {
        ...contracts.chainlinkBusd,
        functionName: 'latestAnswer',
      },
      {
        ...contracts.elephant,
        functionName: 'balanceOf',
        args: [contracts.graveyard.address],
      },
      {
        ...contracts.elephant,
        functionName: 'balanceOf',
        args: [contracts.bertha.address],
      },
      {
        ...contracts.elephant,
        functionName: 'balanceOf',
        args: [contracts.liquidityDriveEvent.address],
      },
      {
        ...contracts.elephant,
        functionName: 'balanceOf',
        args: [contracts.opBorrowingDelegator.address],
      },
      {
        ...contracts.elephantWbnb,
        functionName: 'getReserves',
      },
      {
        ...contracts.elephantBusd,
        functionName: 'getReserves',
      },
      {
        ...contracts.trunk,
        functionName: 'totalSupply',
      },
      {
        ...contracts.trunk,
        functionName: 'balanceOf',
        args: [contracts.trunkTreasury.address],
      },
      {
        ...contracts.trunkBusd,
        functionName: 'getReserves',
      },
      {
        ...contracts.unlimitedNft,
        functionName: 'price',
      },
      {
        address: contracts.unlimitedNft.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        ...contracts.unlimitedNftMinter,
        functionName: 'deposited',
      },
      {
        ...contracts.unlimitedNftStaking,
        functionName: 'totalRewards',
      },
      {
        address: contracts.unlimitedNftStaking.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        ...contracts.unlimitedNftMarketplace,
        functionName: 'price',
      },
      {
        ...contracts.unlimitedNftMarketplace,
        functionName: 'totalRevenue',
      },
      {
        ...contracts.unlimitedNftMarketplace,
        functionName: 'totalSales',
      },
      {
        address: contracts.unlimitedNftMarketplace.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        ...contracts.futures,
        functionName: 'getInfo',
      },
      {
        ...contracts.busd,
        functionName: 'balanceOf',
        args: [contracts.busdBufferPool.address],
      },
      {
        ...contracts.busd,
        functionName: 'balanceOf',
        args: [contracts.busdTreasury.address],
      },
      {
        ...contracts.trumpet,
        functionName: 'getInfo',
      },
    ],
  });

  const data = {
    bnbPrice: format(results[0].result, 8),
    busdPrice: format(results[1].result, 8),
    graveyardElephantBalance: format(results[2].result, 9),
    berthaElephantBalance: format(results[3].result, 9),
    liquidityDriveEventElephantBalance: format(results[4].result, 9),
    openLeverageElephantBalance: format(results[5].result, 9),
    elephantWbnbReserves: format(results[6].result, [18, 9]),
    elephantBusdReserves: format(results[7].result, [9, 18]),
    trunkTotalSupply: format(results[8].result, 18),
    trunkTreasuryBalance: format(results[9].result, 18),
    trunkBusdReserves: format(results[10].result, [18, 18]),
    unlimitedNftPrice: format(results[11].result, 18),
    unlimitedNftTotalSupply: format(results[12].result, 0),
    unlimitedNftMinterDeposited: format(results[13].result, 18),
    unlimitedNftStakingTotalRewards: format(results[14].result, 9),
    unlimitedNftStakingTotalSupply: format(results[15].result, 0),
    unlimitedNftMarketplacePrice: format(results[16].result, 18),
    unlimitedNftMarketplaceTotalRevenue: format(results[17].result, 18),
    unlimitedNftMarketplaceTotalSales: format(results[18].result, 0),
    unlimitedNftMarketplaceTotalSupply: format(results[19].result, 0),
    futuresInfo: format(results[20].result, [0, 18, 18, 18, 18, 0, 18]),
    bufferPoolBusdBalance: format(results[21].result, 18),
    busdTreasuryBusdBalance: format(results[22].result, 18),
    trumpetInfo: format(results[23].result, [0, 0, 18, 18, 18]),
  };

  return data;
};
