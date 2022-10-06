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
  try {
    let response = await fetch(`http://betterjargonapi-env.eba-rzb43vsp.us-east-1.elasticbeanstalk.com/api/v1/words/${context.matches[0]}`);
    response = await response.json();
    await say(response.short_definition);
  } catch (e) {
    await say('Not found');
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