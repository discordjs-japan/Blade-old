const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "./"

client.on("ready", () => {
  client.user.setGame('djs-jpn.ga｜./help');
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
      "title": "Blade",
      "url": "https://github.com/DJS-JPN/Blade",
      "color": 16098851,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4",
        "text": "DJS-JPN"
      },
      "thumbnail": {
        "url": client.user.avatarURL
      },
      "author": {
        "name": "コマンド一覧",
        "url": "https://djs-jpn.ga/bots/Blade",
        "icon_url": client.user.avatarURL
      },
      "fields": [
        {
          "name": "./help",
          "value": "コマンド一覧を表示"
        },
        {
          "name": "./ping",
          "value": "通信速度を測定",
        },
        {
          "name": "./avatar",
          "value": "自分のプロフィール画像を表示",
        },
        {
          "name": "公式サイト",
          "value": "https://goo.gl/BZgMCe",
          "inline": true
        },
        {
          "name": "バグ報告",
          "value": "https://goo.gl/TWb2tB",
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
