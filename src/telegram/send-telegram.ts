import { CHAT_ID } from '../utils/env-vars';
import { bot } from './client';
import { opts } from '../utils/opts';
import { getBlockchainData } from '../web3/multicall';
import { doCalcs } from '../web3/calculations';
import { sleep } from '../utils/misc';
import { elephantMsg } from './messages/elephant';
import { trunkMsg } from './messages/trunk';
import { trumpetMsg } from './messages/trumpet';
import { futuresMsg } from './messages/futures';
import { nftMsg } from './messages/nft';
import { stressTestMsg } from './messages/stress-test';

const messageDelay: number = 750;

const sendTelegramMsg = async (msg: string, topic?: number): Promise<void> => {
  try {
    await bot.sendMessage(CHAT_ID, msg, opts(topic));
  } catch (error) {
    console.error('❌ sendTelegramMsg() error!', error);
    throw error;
  }
};

(async (): Promise<void> => {
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

  await sendTelegramMsg(stressTestMessage, 750);
  await sleep(messageDelay);
  await sendTelegramMsg(trumpetMessage, 752);
  await sleep(messageDelay);
  await sendTelegramMsg(trunkMessage, 748);
  await sleep(messageDelay);
  await sendTelegramMsg(nftMessage, 67);
  await sleep(messageDelay);
  await sendTelegramMsg(futuresMessage, 127);
  await sleep(messageDelay);
  await sendTelegramMsg(elephantMessage);
})();
