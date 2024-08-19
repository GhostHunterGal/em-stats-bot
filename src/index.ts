import { sendElephantMoneyMsgs } from './telegram/send-telegram.js';

export const handler = async (event: any) => {
  try {
    await sendElephantMoneyMsgs();
    const response = {
      statusCode: 200,
      body: JSON.stringify('Elephant Money Telegram messages sent.'),
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};
