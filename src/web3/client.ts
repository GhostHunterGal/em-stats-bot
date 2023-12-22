import { NODE_ENDPOINT } from '../utils/env-vars';
import { createPublicClient, fallback, http } from 'viem';
import { bsc } from 'viem/chains';

const chainStack = http(NODE_ENDPOINT);
const ankr = http('https://rpc.ankr.com/bsc');

export const client = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: bsc,
  transport: fallback([chainStack, ankr]),
});
