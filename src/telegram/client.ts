import { TELEGRAM_API_KEY } from '../utils/env-vars.js';
import TelegramBot from 'node-telegram-bot-api';

export const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: false });
