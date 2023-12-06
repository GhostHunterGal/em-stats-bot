import 'dotenv/config';
import cron from 'node-cron';
import { exec } from 'child_process';

console.log('Cron job started....');

cron.schedule('*/10 * * * *', () => {
  exec('node dist/telegram/send-telegram.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing send-telegram.js:', error.message);
      return;
    }
    if (stderr) {
      console.error('Error executing send-telegram.js:', stderr);
      return;
    }
  });
});
