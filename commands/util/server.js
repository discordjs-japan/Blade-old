const commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class AddNumbersCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'server',
      group: 'util',
      memberName: 'server',
      description: 'サーバーの情報を表示',
    })
  }

  async run (msg, args) {
    const Server = new Discord.RichEmbed()
      .setColor('#0x00FF00')
      .setTitle('サーバーステータス')
      .setThumbnail(msg.guild.iconURL)
      .addField('サーバーID', msg.guild.id, true)
      .addField('オーナー', msg.guild.owner.id, true)
      .addField('人数', msg.guild.members.size, true)
      .addField('リージョン', msg.guild.region, true)
      .addField('チャンネル数', msg.guild.channels.size, true)
      .addField('サーバー作成日', msg.guild.createdAt)
      .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
    return msg.channel.send(Server)
  }
}
