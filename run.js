const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "./"

client.on("ready", () => {
  client.user.setGame('./help');
  console.log("起動完了\nこのBOTはDJS-JPNによって開発されました。\nBOTを停止するには Ctrl+C を押して下さい。");
});

client.on("message", message => { //Commands
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command === "help") {
    const embed = {
      "title": "コマンド一覧",
      "url": "https://djs-jpn.ga/bots/Blade",
      "color": 16098851,
      "timestamp": "2018-02-10T11:01:17.280Z",
      "footer": {
        "icon_url": "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4",
        "text": "DJS-JPN"
      },
      "thumbnail": {
        "url": "https://djs-jpn.ga/assets/images/Blade.png"
      },
      "author": {
        "name": "Blade",
        "url": "https://github.com/DJS-JPN/Blade",
        "icon_url": "https://djs-jpn.ga/assets/images/Blade.png"
      },
      "fields": [
        {
          "name": "このBOTについて",
          "value": "編集中"
        },
        {
          "name": "公式サイト",
          "value": "[Click here](https:://djs-jpn.ga)",
          "inline": true
        },
        {
          "name": "バグ報告",
          "value": "[Click here](https:://discord.gg/DbTpjXV)",
          "inline": true
        }
      ]
    };
    message.channel.send({embed});
  } else
  if (command === "ping") {
    message.channel.sendMessage(new Date().getTime() - message.createdTimestamp + "ms");
  } else
  if (command === "avatar") {
    message.reply(message.author.avatarURL);
  }
});
/*
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0x00FF00)
  .addField('Join(参加)', `${member.user.tag}様`)
  .setImage("https://djs-jpn.ga/assets/images/Join.png")
  .setTimestamp()
  client.channels.find('name', config.joinmsgchannel).send(embed);
});
client.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .addField('Quit(退出)', `${member.user.tag}様`)
  .setImage("https://djs-jpn.ga/assets/images/Quit.png")
  .setTimestamp()
  client.channels.find('name', config.quitmsgchannel).send(embed);
});
*/
client.login(config.token);
