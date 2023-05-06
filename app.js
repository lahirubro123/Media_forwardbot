const { Telegraf } = require('telegraf');
require('dotenv').config();


const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('video', async (ctx) => {
  const chatId = ctx.message.chat.id;
  const channelId = process.env.CHANNEL_ID; // replace with your channel ID

  try {
    // forward the video to the channel with no preview, no thumbnail, and no "Forwarded from" label
    await bot.telegram.forwardMessage(channelId, chatId, ctx.message.message_id, {
      disable_notification: true,
      disable_web_page_preview: true,
      caption: ctx.message.caption,
      parse_mode: 'Markdown',
      thumb: null,
      disable_forwarded: true,
    });

    // send a confirmation message to the user
    ctx.reply('Your video has been forwarded!');
  } catch (error) {
    console.log(error);
    ctx.reply('There was an error forwarding your video.');
  }
});

bot.command('start', (ctx) => {
  ctx.reply('Hello! I am alive!');
});

bot.startPolling();
