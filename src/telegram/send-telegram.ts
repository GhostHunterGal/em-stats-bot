import { CHAT_ID } from '../utils/env-vars.js';
import { bot } from './client.js';
import { opts } from '../utils/opts.js';
import { getBlockchainData } from '../web3/multicall.js';
import { doCalcs } from '../web3/calculations.js';
import { sleep } from '../utils/misc.js';
import { elephantMsg } from './messages/elephant.js';
import { trunkMsg } from './messages/trunk.js';
import { trumpetMsg } from './messages/trumpet.js';
import { futuresMsg } from './messages/futures.js';
import { nftMsg } from './messages/nft.js';
import { stressTestMsg } from './messages/stress-test.js';

const messageDelay: number = 750;

const sendTelegramMsg = async (msg: string, topic?: number): Promise<void> => {
  try {
    await bot.sendMessage(CHAT_ID, msg, opts(topic));
  } catch (error) {
    console.error('❌ sendTelegramMsg() error!', error);
    throw error;
  }
};

export const sendElephantMoneyMsgs = async (): Promise<void> => {
  const data = await getBlockchainData();
  const calcs = await doCalcs(data);

  const [
    elephantMessage,
    trunkMessage,
    trumpetMessage,
    futuresMessage,
    nftMessage,
    stressTestMessage,
  ] = await Promise.all([
    elephantMsg(data, calcs),
    trunkMsg(data, calcs),
    trumpetMsg(calcs),
    futuresMsg(data, calcs),
    nftMsg(data, calcs),
    stressTestMsg(data, calcs),
  ]);

  await sendTelegramMsg(stressTestMessage, 12731);
  await sleep(messageDelay);
  await sendTelegramMsg(trumpetMessage, 9);
  await sleep(messageDelay);
  await sendTelegramMsg(trunkMessage, 29382);
  await sleep(messageDelay);
  await sendTelegramMsg(nftMessage, 7);
  await sleep(messageDelay);
  await sendTelegramMsg(futuresMessage, 4);
  await sleep(messageDelay);
  await sendTelegramMsg(elephantMessage);
};
