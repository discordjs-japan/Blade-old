const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = "./"
client.on("ready", () => {
  client.user.setGame('./help');
  console.log("起動完了\n\nこのBOTはDJS-JPNによって開発されました。");
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command === "help") {
    message.channel.sendMessage("制作途中");
  }
});
client.login(config.token);
