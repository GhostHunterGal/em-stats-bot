import { SendMessageOptions } from 'node-telegram-bot-api';

export const opts = (msgThreadId?: number): SendMessageOptions => {
  return {
    message_thread_id: msgThreadId,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
};
