const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "./"

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
    message.reply(message.author.avatarURL);
  }
});
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
client.login(config.token);
