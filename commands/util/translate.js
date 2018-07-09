const commando = require('discord.js-commando')
const util = require('../../util')
const request = require('request')

module.exports = class AddNumbersCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'translate',
      aliases: ['t'],
      group: 'util',
      memberName: 'translate',
      description: 'テキストを翻訳',
      examples: ['translate ja_jp Hello'],

      args: [
        {
          key: 'lang',
          label: 'lang',
          prompt: '翻訳先の言語を入力してください。',
          type: 'string',
        },
        {
          key: 'source',
          label: 'source',
          prompt: '翻訳したい内容を入力してください。',
          type: 'string',
        },
      ],
    })
  }

  async run (msg, args) {
    request({
      method: 'POST',
      url: 'https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'AndroidTranslate',
      },
      form: {
        'sl': 'auto',
        'tl': args.lang,
        'q': args.source,
      },
      json: true,
    }, function (e, r, b) {
      if (e) {
        util.sendEmbed(msg, '翻訳に失敗しました。翻訳する内容または翻訳先の言語が無効な可能性があります。')
      } else {
        return msg.channel.send(`${msg.author.tag}:${b.sentences[0].trans}\nオリジナル：${args.source}`)
      }
    })
  }
}
