const commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class PingCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      group: 'util',
      memberName: 'avatar',
      description: '送信者のプロフィール画像を表示',
    })
  }

  async run (msg) {
    const Avatar = new Discord.RichEmbed()
      .setImage(msg.author.avatarURL)
    msg.channel.send(Avatar)
  }
}
