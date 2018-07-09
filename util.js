const Discord = require('discord.js')

module.exports = {
  sendEmbed (context, message) {
    const Embed = new Discord.RichEmbed()
      .setTitle(message)
      .setColor('#0x00FF00')
      .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
    context.channel.send(Embed)
  },
  checkbotsafety (member) {
    if ([
      '235088799074484224', // Rythm
      '155149108183695360', // Dyno
      '222853335877812224', // Server Hound
      '294882584201003009', // Giveaway bot
      '245675252821000193', // Gaius Cicereius
      '367317166573355008', // うううさんのRPGⅡ
      '346650373613682688', // ボットちゃん
      '378929559862640650', // sou-trade
      '404873188947001355', // C-Coin
      '406292122963017749', // C-Casino
      '394876010438328321', // Greeting Bot
      '83010416610906112',  // Night Bot
      '153613756348366849', // Typical Bot
      '265218275451863041', // GuideBot
      '241694957490929664', // MDN Duh
      '172002275412279296', // Tatsumaki
      '376433393262526476', // DSL Bot
      '324829950639341568', // Discordちゃんねる
      '302050872383242240', // Disboard
      '240545475118235648', // BugBot
    ].includes(member.id)) return '認証済み'
    else if ([
      '410775769980338177', // Coded Beta
      '407775279642050560', // Coded
      '411900942577827840', // Blade
      '399018614382133248', // Red Music
      '388258872395300865', // Red Return
    ].includes(member.id)) return '信頼'
    else return '不明'
  },
}
