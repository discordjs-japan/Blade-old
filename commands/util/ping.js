const commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class PingCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      group: 'util',
      memberName: 'ping',
      description: 'ボットのPingを確認',
    })
  }

  async run (msg) {
    const Embed = new Discord.RichEmbed()
      .setTitle(`ポン！Pingの確認に成功しました！ボットのPingは${Math.floor(this.client.ping)}msです！`)
      .setColor('#0x00FF00')
      .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
    msg.channel.send(Embed)
  }
}
