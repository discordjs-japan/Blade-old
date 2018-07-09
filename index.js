const { parsed: env } = require('dotenv').load()
const Discord = require('discord.js')
const commando = require('discord.js-commando')
const path = require('path')
const oneLine = require('common-tags').oneLine
const sqlite = require('sqlite')
const util = require('./util')

const client = new commando.Client({
  owner: env.OWNER.split(','),
  commandPrefix: env.PREFIX,
  unknownCommandResponse: false,
})

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(`Logged in as ${client.user.tag} developed by DJS-JPN!`)
    client.user.setStatus('dnd')
    client.user.setPresence({
      game: {
        name: `djs-jpn.ga | Type @${client.user.tag}help to show help`,
        type: 1,
      },
    })
  })
  .on('disconnect', () => console.warn('Disconnected!'))
  .on('reconnecting', () => console.warn('Reconnecting...'))
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine`
      Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
      blocked; ${reason}
    `)
  })
  .on('unknownCommand', msg => {
    util.sendEmbed(msg, `不明なコマンドです。@${client.user.tag} helpでコマンドに誤字、脱字、コマンドが存在するか確認をお願いいたします。`)
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine`
      Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `)
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine`
      Command ${command.groupID}:${command.memberName}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `)
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine`
      Group ${group.id}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `)
  })
  .on('guildMemberAdd', member => {
    if (env.WELCOMECHANNEL !== 'disable') return
    if (member.user.bot === false) {
      const Embed = new Discord.RichEmbed()
        .addField('新しいユーザーがサーバーに参加しました。', `参加したユーザー：${member.user.tag}`, true)
        .addField(`${member.user.tag}さん。ようこそ！`, `@${client.user.tag} helpでコマンド一覧を確認できます！`, true)
        .addField('バグ報告などはこちらへ', 'https://discord.gg/DbTpjXV')
        .addField('このユーザーはボットではありません。', `ID：${member.id}`)
        .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
        .setThumbnail(member.user.avatarURL)
        .setColor('#FFFFFF')
      client.channels.get(env.WELCOMECHANNEL).send(Embed)
    } else {
      const Embed = new Discord.RichEmbed()
        .addField('新しいボットがサーバーに参加しました。', `参加したボット：${member.user.tag}`, true)
        .addField('このボットの信頼性', util.checkbotsafety(member), true)
        .addField(`このボットを使用して${client.user.tag}に問題が発生した場合はこちらへ`, 'https://discord.gg/DbTpjXV')
        .addField('このユーザーはボットです。', `ID：${member.id}`)
        .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
        .setThumbnail(member.user.avatarURL)
        .setColor('#FFFFFF')
      client.channels.get(env.WELCOMECHANNEL).send(Embed)
    }
  })
  .on('guildMemberRemove', member => {
    if (env.WELCOMECHANNEL !== 'disable') return
    if (member.user.bot === false) {
      const Embed = new Discord.RichEmbed()
        .addField('ユーザーがサーバーから退出しました。', `退出したユーザー：${member.user.tag}`, true)
        .addField(`${member.user.tag}さん。さようなら...`, 'またどこかでお会いしましょう！', true)
        .addField('バグ報告などはこちらへ', 'https://discord.gg/DbTpjXV')
        .addField('このユーザーはボットではありません。', `ID：${member.user.tag}`)
        .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
        .setThumbnail(member.user.avatarURL)
        .setColor('#0x00FF00')
      client.channels.get(env.WELCOMECHANNEL).send(Embed)
    } else {
      const Embed = new Discord.RichEmbed()
        .addField('ボットがサーバーから退出しました。', `退出したボット：${member.user.tag}`, true)
        .addField(`このボットを使用して${client.user.tag}に問題が発生した場合はこちらへ`, 'https://discord.gg/DbTpjXV')
        .addField('このボットの信頼性', util.checkbotsafety(member), true)
        .addField('このユーザーはボットです。', `ID：${member.id}`)
        .setFooter('DEVELOPED BY DJS-JPN', 'https://avatars3.githubusercontent.com/u/35397294?s=200&v=4')
        .setThumbnail(member.user.avatarURL)
        .setColor('#0x00FF00')
      client.channels.get(env.WELCOMECHANNEL).send(Embed)
    }
  })

client.setProvider(
  sqlite.open(path.join(__dirname, 'database.sqlite3'))
    .then(db => new commando.SQLiteProvider(db))
).catch(console.error)

client.registry
  .registerDefaultTypes()
  .registerGroup('util')
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(env.TOKEN)
