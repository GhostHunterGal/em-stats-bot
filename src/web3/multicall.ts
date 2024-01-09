import { archiveClient, client } from './client';
import { contracts, erc20Abi } from './contracts';
import { getBlockNumber24HoursAgo } from '../utils/misc';
import { formatEther, formatUnits, parseEther } from 'viem';

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
  unlimitedNftMinterBusdDeposited: number;
  unlimitedNftStakingTotalRewards: number;
  unlimitedNftStakingTotalSupply: number;
  unlimitedNftMarketplacePrice: number;
  unlimitedNftMarketplaceTotalRevenue: number;
  unlimitedNftMarketplaceTotalSales: number;
  unlimitedNftMarketplaceTotalSupply: number;
  futuresInfo: number[];
  futuresDailyYield: number;
  trumpetInfo: number[];
  bnbReserveStrategyAvailable: number[];
  aprForwardAvailable: number[];
  pegSupportTreasuryStrategyAvailable: number[];
  bnbReserveBnbBalance: number;
  futuresInfo24HoursAgo: number[];
  trumpetInfo24HoursAgo: number[];
}

export const getBlockchainData = async () => {
  const blockNumber = await client.getBlockNumber();
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
        ...contracts.unlimitedNftMinter,
        functionName: 'busd_value_deposited',
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
        ...contracts.futures,
        functionName: 'scaleByPeg',
        args: [parseEther('0.5')],
      },
      {
        ...contracts.trumpet,
        functionName: 'getInfo',
      },
      {
        ...contracts.bnbReserveStrategy,
        functionName: 'available',
      },
      {
        ...contracts.AprForward,
        functionName: 'available',
      },
      {
        ...contracts.pegSupportTreasuryStrategy,
        functionName: 'available',
      },
    ],
    blockNumber: blockNumber,
  });

  const bnbReserveBnbBalance = await client.getBalance({
    address: contracts.bnbReserve.address,
    blockNumber: blockNumber,
  });

  const blockNumber24HoursAgo = await getBlockNumber24HoursAgo(
    blockNumber,
    client
  );

  const results24HoursAgo = await archiveClient.multicall({
    contracts: [
      {
        ...contracts.futures,
        functionName: 'getInfo',
      },
      {
        ...contracts.trumpet,
        functionName: 'getInfo',
      },
    ],
    blockNumber: blockNumber24HoursAgo,
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
    unlimitedNftMinterBusdDeposited: Number(
      formatEther(results[15].result as bigint)
    ),
    unlimitedNftStakingTotalRewards: Number(
      formatUnits(results[16].result as bigint, 9)
    ),
    unlimitedNftStakingTotalSupply: Number(results[17].result),
    unlimitedNftMarketplacePrice: Number(
      formatEther(results[18].result as bigint)
    ),
    unlimitedNftMarketplaceTotalRevenue: Number(
      formatEther(results[19].result as bigint)
    ),
    unlimitedNftMarketplaceTotalSales: Number(results[20].result),
    unlimitedNftMarketplaceTotalSupply: Number(results[21].result),
    futuresInfo: (results[22].result as bigint[]).map((value, index) =>
      index === 0 || index === 5 ? Number(value) : Number(formatEther(value))
    ),
    futuresDailyYield: Number(formatEther(results[23].result as bigint)),
    trumpetInfo: (results[24].result as bigint[]).map((value, index) =>
      index <= 1 ? Number(value) : Number(formatEther(value))
    ),
    bnbReserveStrategyAvailable: (results[25].result as bigint[]).map((value) =>
      Number(formatUnits(value, 9))
    ),
    aprForwardAvailable: (results[26].result as bigint[]).map((value) =>
      Number(formatUnits(value, 9))
    ),
    pegSupportTreasuryStrategyAvailable: (results[27].result as bigint[]).map(
      (value) => Number(formatUnits(value, 9))
    ),
    bnbReserveBnbBalance: Number(formatEther(bnbReserveBnbBalance)),
    futuresInfo24HoursAgo: (
      results24HoursAgo[0].result as unknown as bigint[]
    ).map((value, index) =>
      index === 0 || index === 5 ? Number(value) : Number(formatEther(value))
    ),
    trumpetInfo24HoursAgo: (
      results24HoursAgo[1].result as unknown as bigint[]
    ).map((value, index) =>
      index <= 1 ? Number(value) : Number(formatEther(value))
    ),
  };

  return data;
};
