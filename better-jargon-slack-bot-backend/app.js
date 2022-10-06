require('dotenv').config()

const { App, ExpressReceiver } = require('@slack/bolt');
const fetch = require('node-fetch');

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  receiver: receiver
});

const re = new RegExp('.*');

app.message(re, async ({ context, say }) => {
  const block = {
    blocks: [],
  };

  const error = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Definition not found :sadnerd:, <https://www.investopedia.com/search?q=${context.matches[0]}|try Investopedia> `,
    },
  };

  try {
    let response = await fetch(
      `http://betterjargonapi-env.eba-rzb43vsp.us-east-1.elasticbeanstalk.com/api/v1/words/${context.matches[0]}`
    );
    response = await response.json();

    const short_definition = {
      type: "section",
      text: {
        type: "plain_text",
        text: `${response.short_definition}`,
      },
    };
    const long_definition = {
      type: "section",
      text: {
        type: "plain_text",
        text: `${response.long_definition}`,
      },
    };
    const url = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<${response.url}|More Info>`,
      },
    };

    (await response.short_definition)
      ? block.blocks.push(short_definition)
      : null;
    (await response.long_definition)
      ? block.blocks.push(long_definition)
      : null;
    (await response.url) ? block.blocks.push(url) : null;
    await say(block);
  } catch (e) {
    block.blocks.push(error);
    await say(block);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3080);
  console.log("⚡️ Bolt app is running!");
})();

// health check for ALB
receiver.app.get('/', (_, res) => {
  res.status(200).send(); // respond 200 OK to the default health check method
});