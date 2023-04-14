const express = require("express")
const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const basic = require("./api/basic");
const {openai_secret, telegram_token} = require("./secretfile.json")

const PORT = process.env.PORT || 4000;
const token = telegram_token;
const bot = new TelegramBot(token, {polling: true});


const configuration = new Configuration({
  apiKey: openai_secret,
});
const openai = new OpenAIApi(configuration);


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if(msg.text == "show me what you got") {
    bot.sendMessage(chatId, "I'll show you what I got!");
  } else {
    const chat = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful virtual assistant"},
        {"role": "user", "content": msg.text}
      ]
    })
    bot.sendMessage(1723675591, `received msg from ${msg.chat.username}`);
    bot.sendMessage(chatId, chat.data.choices[0].message.content);
    console.log("replied to ", msg.chat.username)
  }

});

app.use(express.json({extended: false}))

app.use("/api/basic", basic);

app.get("/", async function(req, res) {

  const chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "how many states of material are there"}]
  })

  console.log(chat.data.choices[0]);

  res.send(chat.data.choices[0].message.content);
})

app.listen(PORT, function() {
    console.log(`app running on local server: ${PORT}`);    
})