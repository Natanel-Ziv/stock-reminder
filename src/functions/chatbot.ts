import type {Context} from 'telegraf';
import {Telegraf} from 'telegraf';
import type {Message} from 'typegram';
import {TELEGRAM_BOT_TOKEN} from '../framework/environment';
import {getCompanyProfile, getQuote, getRecommendationTrends} from './manageStocks';
import {createRecommendationImg} from './plotHelper';

const parseSymbol = (ctx: Context): string => {
  const symbol: string = (ctx.message as Message.TextMessage).text.split(' ')[1];

  if (symbol === '' || symbol === undefined) {
    void ctx.reply('Don\'t forget to add symbol');

    return '';
  }

  return symbol.toUpperCase();
};

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx: Context) => {
  void ctx.reply(`Welcome to Stock Helper ${ctx.from.first_name}\n
Use /help for usage`);
});

bot.command('help', (ctx: Context) => {
  void ctx.reply('Supported commands:\n' +
    '/help - shows this message\n' +
    '/info <symbol> - shows basic info about the symbol\n' +
    '/price <symbol> - shows last closing price\n' +
    '/recommendation <symbol> - shows recommendation\n');
});

bot.command('info', async (ctx: Context) => {
  const symbol: string = parseSymbol(ctx);

  if (symbol === '') {
    return;
  }
  const companyProfile = await getCompanyProfile(symbol);
  const closePrice = (await getQuote(symbol)).close;
  const ret = `Company Name: ${companyProfile.name}\n` +
                `Symbol: ${symbol}\n` +
                `Industry: ${companyProfile.finnhubIndustry}\n` +
                `Weburl: ${companyProfile.weburl}\n` +
                `Current Price: ${closePrice}`;

  void ctx.reply(ret, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    disable_web_page_preview: true
  });
});

bot.command('price', async (ctx: Context) => {
  const symbol: string = parseSymbol(ctx);

  if (symbol === '') {
    return;
  }
  const ans = await getQuote(symbol);
  const ret = `Last Close: ${ans.close}`;

  void ctx.reply(ret);
});

bot.command('recommendation', async (ctx: Context) => {
  const symbol: string = parseSymbol(ctx);

  if (symbol === '') {
    return;
  }
  const recommendations = await getRecommendationTrends(symbol);

  await createRecommendationImg(recommendations).then(isSaved => {
    if (isSaved) {
      void ctx.replyWithPhoto({source: 'assets/plot.png'});
    }
    else {
      void ctx.reply('Failed to create IMG');
    }
  })
    .catch(error => {
      console.log(error);
      void ctx.reply('Failed to create IMG');
    });
});

bot.on('text', (ctx: Context) => {
  void ctx.reply('No support for free text yet :C');
});

void bot.launch();

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
