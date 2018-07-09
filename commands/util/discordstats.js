const commando = require('discord.js-commando')
const fetch = require('node-fetch')

module.exports = class AddNumbersCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'discordstats',
      group: 'util',
      memberName: 'discordstats',
      description: 'Discordのサーバー状態を確認',
    })
  }

  async run (msg, args) {
    msg.channel.startTyping()
    const _summary = await fetch('https://status.discordapp.com/api/v2/summary.json')
    const _incidents = await fetch('https://status.discordapp.com/api/v2/incidents.json')
    const summary = await _summary.json()
    const incidents = await _incidents.json()
    const status = summary.components.map(component => ({
      name: component.name,
      value: (component.status === 'operational') ? '正常' : '不安定',
      inline: true,
    }))
    const allstats = (summary.status.description === 'All Systems Operational')
      ? '全サーバーは正常です。'
      : 'サーバーが不安定な可能性があります。'
    const maintenance = {
      at: incidents.incidents[0].created_at,
      resolved: (incidents.incidents[0].status === 'resolved') ? '解決済み' : '未解決',
    }
    msg.channel.stopTyping()
    msg.channel.send({
      embed: {
        color: 0x00FF00,
        footer: {
          icon_url: 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4',
          text: 'DEVELOPED BY DJS-JPN',
        },
        fields: [{
          name: 'サーバーの状態',
          value: allstats,
        }, ...status, {
          name: '最後に行われたメンテナンス',
          value: `${maintenance.at}（${maintenance.resolved}）`,
        }],
      },
    })
  }
}
