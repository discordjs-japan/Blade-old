const Discord = require("discord.js");
const googl = require('goo.gl');
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "./"

googl.setKey(config.googl);
googl.getKey();

client.on("ready", () => {
  client.user.setGame('./help');
  console.log("起動完了\n\nこのBOTはDJS-JPNによって開発されました。");
});

client.on("message", message => { //Commands
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command === "help") {
    message.channel.sendMessage("制作途中");
  } else
  if (command === "ping") {
    message.channel.sendMessage(new Date().getTime() - message.createdTimestamp + "ms");
  } else
  if (command === "avatar") {
    googl.shorten(message.author.avatarURL)
    .then(function (shortUrl) {
      message.channel.sendMessage('\nURL: ' + shortUrl);
    })
    .catch(function (err) {
      message.channel.sendMessage('URL短縮化に失敗しました。エラー内容: `' + err.message + '`');
    });
  }
});
client.login(config.token);
