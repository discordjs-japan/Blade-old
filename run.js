const Discord = require("discord.js");
const googl = require('goo.gl');
const ytdl = require('ytdl-core');
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
    message.channel.sendMessage("**コマンド一覧**\n情報```\n./ping, /avatar\n```");
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
  } else
  if (command === "play") {
    message.channel.sendMessage("制作中");
  }
});
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0x00FF00)
  .addField('Join(参加)', `${member.user.tag}`)
  .setImage("https://github.com/DJS-JPN/djs-jpn.github.io/blob/master/assets/images/Join.png?raw=true")
  client.channels.find('name', 'member-log').send(embed);
});
client.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .addField('Quit(退出)', `${member.user.tag}`)
  .setImage("https://github.com/DJS-JPN/djs-jpn.github.io/blob/master/assets/images/Quit.png?raw=true")
  client.channels.find('name', 'member-log').send(embed);
});
client.login(config.token);
