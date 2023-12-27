import { client } from './client';
import { contracts, erc20Abi } from './contracts';
import { formatEther, formatUnits } from 'viem';

export interface BlockchainData {
  bnbPrice: number;
  busdPrice: number;
  graveyardElephantBalance: number;
  berthaElephantBalance: number;
  liquidityDriveEventElephantBalance: number;
  openLeverageElephantBalance: number;
  elephantWbnbReserves: number[];
  elephantBusdReserves: number[];
  trunkTotalSupply: number;
  trunkBusdReserves: number[];
  trunkWbnbReserves: number[];
  trunkBurnBalance: number;
  unlimitedNftPrice: number;
  unlimitedNftTotalSupply: number;
  unlimitedNftMinterDeposited: number;
  unlimitedNftStakingTotalRewards: number;
  unlimitedNftStakingTotalSupply: number;
  unlimitedNftMarketplacePrice: number;
  unlimitedNftMarketplaceTotalRevenue: number;
  unlimitedNftMarketplaceTotalSales: number;
  unlimitedNftMarketplaceTotalSupply: number;
  futuresInfo: number[];
  trumpetInfo: number[];
  bnbReserveBnbBalance: number;
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
        ...contracts.trunkBusd,
        functionName: 'getReserves',
      },
      {
        ...contracts.trunkWbnb,
        functionName: 'getReserves',
      },
      {
        ...contracts.trunk,
        functionName: 'balanceOf',
        args: [contracts.trunkBurnWallet.address],
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
        ...contracts.trumpet,
        functionName: 'getInfo',
      },
    ],
  });

  const bnbReserveBnbBalance = await client.getBalance({
    address: contracts.bnbReserve.address,
  });

  const data = {
    bnbPrice: Number(formatUnits(results[0].result as bigint, 8)),
    busdPrice: Number(formatUnits(results[1].result as bigint, 8)),
    graveyardElephantBalance: Number(
      formatUnits(results[2].result as bigint, 9)
    ),
    berthaElephantBalance: Number(formatUnits(results[3].result as bigint, 9)),
    liquidityDriveEventElephantBalance: Number(
      formatUnits(results[4].result as bigint, 9)
    ),
    openLeverageElephantBalance: Number(
      formatUnits(results[5].result as bigint, 9)
    ),
    elephantWbnbReserves: (results[6].result as bigint[]).map((value, index) =>
      index < 1 ? Number(formatEther(value)) : Number(formatUnits(value, 9))
    ),
    elephantBusdReserves: (results[7].result as bigint[]).map((value, index) =>
      index < 1 ? Number(formatUnits(value, 9)) : Number(formatEther(value))
    ),
    trunkTotalSupply: Number(formatEther(results[8].result as bigint)),
    trunkBusdReserves: (results[9].result as bigint[]).map((value) =>
      Number(formatEther(value))
    ),
    trunkWbnbReserves: (results[10].result as bigint[]).map((value) =>
      Number(formatEther(value))
    ),
    trunkBurnBalance: Number(formatEther(results[11].result as bigint)),
    unlimitedNftPrice: Number(formatEther(results[12].result as bigint)),
    unlimitedNftTotalSupply: Number(results[13].result),
    unlimitedNftMinterDeposited: Number(
      formatEther(results[14].result as bigint)
    ),
    unlimitedNftStakingTotalRewards: Number(
      formatUnits(results[15].result as bigint, 9)
    ),
    unlimitedNftStakingTotalSupply: Number(results[16].result),
    unlimitedNftMarketplacePrice: Number(
      formatEther(results[17].result as bigint)
    ),
    unlimitedNftMarketplaceTotalRevenue: Number(
      formatEther(results[18].result as bigint)
    ),
    unlimitedNftMarketplaceTotalSales: Number(results[19].result),
    unlimitedNftMarketplaceTotalSupply: Number(results[20].result),
    futuresInfo: (results[21].result as bigint[]).map((value, index) =>
      index === 0 || index === 5 ? Number(value) : Number(formatEther(value))
    ),
    trumpetInfo: (results[22].result as bigint[]).map((value, index) =>
      index <= 1 ? Number(value) : Number(formatEther(value))
    ),
    bnbReserveBnbBalance: Number(formatEther(bnbReserveBnbBalance)),
  };

  return data;
};
