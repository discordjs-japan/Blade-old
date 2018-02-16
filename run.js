console.time("全コードの読み込みにかかった時間");
const DiscordJS = require("discord.js"),
    File = require("fs"),
    FileExtra = require("fs-extra"),
    Request = require("request");
var Blade = new DiscordJS.Client();
var Config = require("./config.json")
Blade.login(Config.token);
var Prefix = "./",
    Lang = "ja_jp",
    TemporaryFileContents = "";

Blade
    .on("ready", () => {
        Blade.user.setStatus("available")
        Blade.user.setPresence({
            game: {
                name: "djs-jpn.ga | Type " + Prefix + "help to show help",
                type: 2
            }
        });
        console.log("ログイン成功 | Login success\nこのボットはDJS-JPNによって開発されました | This bot is developed by DJS-JPN\nボットを停止するにはターミナルで Ctrl+C を押すようお願いします。");
    })

    .on("message", m => {
        if (m.author.bot) return;
        if (!m.content.startsWith(Prefix)) return;
        //let command = m.content.split(" ");
        //command = command.slice(Prefix.length);
        Command = m.content.slice(Prefix.length).split(" ");
        //let args = m.content.split(" ").slice(1);
        if (Command[0] == "help") {
            const embed = {
                "color": 16098851,
                "timestamp": new Date(),
                "footer": {
                    "icon_url": "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4",
                    "text": "DJS-JPN"
                },
                "thumbnail": {
                    "url": Blade.user.avatarURL
                },
                "author": {
                    "name": "コマンド一覧",
                    "url": "https://djs-jpn.ga/bots/Blade",
                    "icon_url": Blade.user.avatarURL
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
                        "name": "バグ報告・公式Discord",
                        "value": "https://goo.gl/TWb2tB",
                        "inline": true
                    },
                    {
                        "name": "GitHub",
                        "value": "https://goo.gl/iwxSoG",
                        "inline": true
                    }
                ]
            };
            m.channel.send({ embed });
        } else if (Command[0] === "ping") {
            sendEmbed(m, "Pong！Pingの確認に成功しました！ボットのPingは" + Blade.ping + "msです！"/*このメッセージの作成速度は" + new Date().getTime() - m.createdTimestamp + "msです！"*/);
        } else if (Command[0] === "avatar") {
            m.reply(m.author.avatarURL);
        } else if (Command[0] == "serverstats") {
            //サーバーステータス
        } else if (Command[0] == "discordstats") {
            //Discordのサーバーの状態を確認
        } else {
            sendEmbed(m, "不明なコマンドです。" + Prefix + "helpでコマンドに誤字、脱字、コマンドが存在するか確認をお願いいたします。")
        }
    });
/*
Blade.on('guildMemberAdd', member => {
  let guild = member.guild;
  const embed = new DiscordJS.RichEmbed()
  .setColor(0x00FF00)
  .addField('Join(参加)', `${member.user.tag}様`)
  .setImage("https://djs-jpn.ga/assets/images/Join.png")
  .setTimestamp()
  Blade.channels.find('name', config.joinmsgchannel).send(embed);
});
Blade.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new DiscordJS.RichEmbed()
  .setColor(0xFF0000)
  .addField('Quit(退出)', `${member.user.tag}様`)
  .setImage("https://djs-jpn.ga/assets/images/Quit.png")
  .setTimestamp()
  Blade.channels.find('name', config.quitmsgchannel).send(embed);
});
*/
function sendEmbed(context, message) {
    Embed = new DiscordJS.RichEmbed()
        .setTitle(message)
        .setColor("#FFFFFF")
    context.channel.send(Embed);
}
console.timeEnd("全コードの読み込みにかかった時間");
