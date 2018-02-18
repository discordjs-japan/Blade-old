const DiscordJS = require("discord.js");
var Blade = new DiscordJS.Client();
const { parsed: Config } = require('dotenv').load();
Blade.login(Config.Token);
console.time("全コードの読み込みにかかった時間");
console.time("ログインにかかった時間");
const Request = require("request");
const fetch = require('node-fetch');
const Prefix = Config.Prefix;
const Language = require('./language.js')[Config.Language];

Blade
    .on("ready", () => {
        console.timeEnd("ログインにかかった時間");
        Blade.user.setStatus("available");
        Blade.user.setPresence({
            game: {
                name: `djs-jpn.ga | Type ${Prefix}help to show help`,
                type: 1
            }
        });
        if(Config.RestartDelay != "disable")
        console.log(`${Language.loginsuccess}\n${Language.botdeveloped}\n${Language.ctrlpluscstop}`);
        setInterval(function () {
            console.log("==============再起動を開始します==============")
            process.exit(0);
        }, Config.RestartDelay);
    })

    .on("message", async m => {
        if (m.author.bot) return;
        if (!m.content.startsWith(Prefix)) return;
        const [cmd, ...args] = m.content.slice(Prefix.length).split(" ");
        switch (cmd) {
            case "help":
                const embed = {
                    "color": 0x00FF00,
                    "timestamp": new Date(),
                    "footer": {
                        "icon_url": "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4",
                        "text": "DEVELOPED BY DJS-JPN"
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
                            "name": "help",
                            "value": Language.helphelp
                        },
                        {
                            "name": "ping",
                            "value": Language.helpping,
                        },
                        {
                            "name": "avatar",
                            "value": Language.helpavatar,
                        },
                        {
                            "name": "translate | t",
                            "value": Language.helptranslate,
                        },
                        {
                            "name": "discordstats",
                            "value": Language.helpdiscordstats,
                        },
                        {
                            "name": Language.helpofficial,
                            "value": "https://djs-jpn.ga",
                            "inline": true
                        },
                        {
                            "name": Language.helpbugreport,
                            "value": "https://discord.gg/DbTpjXV",
                            "inline": true
                        },
                        {
                            "name": "GitHub",
                            "value": "https://github.com/DJS-JPN/Blade",
                            "inline": true
                        }
                    ]
                };
                m.channel.send({ embed });
                break;
            case "ping":
                sendEmbed(m, `ポン！Pingの確認に成功しました！ボットのPingは${Math.floor(Blade.ping)}msです！`/*+ `\nこのメッセージの作成速度は${new Date().getTime() - m.createdTimestampms}です！`*/);
                break;
            case "avatar":
                m.reply(m.author.avatarURL);
                break;
            case "serverstats":
                //サーバーステータス
                break;
            case "translate":
            case "t":
                const [lang, ...source] = args;
                const text = source.join(' ');
                if (!lang) {
                    sendEmbed(m, Language.transmsgtwo);
                } else {
                    if (text) {
                        Request({
                            method: "POST",
                            url: "https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e",
                            headers: {
                                'Content-Type': "application/json; charset=utf-8",
                                'User-Agent': "AndroidTranslate",
                            },
                            form: {
                                "sl": "auto",
                                "tl": lang,
                                "q": text,
                            },
                            json: true,
                        }, function (e, r, b) {
                            if (e) {
                                sendEmbed(m, Language.transfailed);
                            } else {
                                m.channel.send(`${m.author.tag}:${b.sentences[0].trans}\n${Language.transoriginal}${text}`);
                            }
                        });
                    } else {
                        sendEmbed(m, Language.transmsg);
                    }
                }
                break;
            case "discordstats":
                m.channel.startTyping();
                console.time("サーバーの状態の取得にかかった時間");
                const _summary = await fetch('https://status.discordapp.com/api/v2/summary.json');
                const _incidents = await fetch('https://status.discordapp.com/api/v2/incidents.json');
                const summary = await _summary.json();
                const incidents = await _incidents.json();
                const status = summary.components.map(e => ({
                    name: e.name,
                    value: (e.status === 'operational') ? Language.discordstatsnormal : Language.discordstatsabnormal,
                    inline: true,
                }));
                const allstats = (summary.status.description == 'All Systems Operational')
                    ? '全サーバーは正常です。'
                    : 'サーバーが不安定な可能性があります。'
                const maintenance = {
                    at: incidents.incidents[0].created_at,
                    resolved: (incidents.incidents[0].status == "resolved")
                        ? Language.discordstatsresolved
                        : Language.discordstatsreunresolved,
                }
                console.timeEnd("サーバーの状態の取得にかかった時間");
                m.channel.stopTyping();
                m.channel.send({
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
                        }]
                    }
                })
                break;
            default:
                sendEmbed(m, `不明なコマンドです。${Prefix}helpでコマンドに誤字、脱字、コマンドが存在するか確認をお願いいたします。`)
                break;
        }
    })
    .on('guildMemberAdd', m => {
        if (Config.WelcomeChannel != "disable") {
            if (m.user.bot == false) {
                const Embed = new DiscordJS.RichEmbed()
                    .addField("新しいユーザーがサーバーに参加しました。", `参加したユーザー：${m.user.tag}`, true)
                    .addField(`${m.user.tag}さん。ようこそ！`, `${Prefix}helpでコマンド一覧を確認できます！`, true)
                    .addField("バグ報告などはこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットではありません。", `ID：${m.user.id}`)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#FFFFFF");
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            } else {
                checkbotsafety(m);
                const Embed = new DiscordJS.RichEmbed()
                    .addField("新しいボットがサーバーに参加しました。", `参加したボット：${m.user.tag}`, true)
                    .addField("このボットの信頼性", checkbotsafety(), true)
                    .addField(`このボットを使用して${Blade.user.username}に問題が発生した場合はこちらへ`, "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットです。", `ID：${m.user.id}`)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#FFFFFF");
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            }
        }
    })
    .on('guildMemberRemove', m => {
        if (Config.WelcomeChannel != "disable") {
            if (m.user.bot == false) {
                const Embed = new DiscordJS.RichEmbed()
                    .addField("ユーザーがサーバーから退出しました。", `退出したユーザー：${m.user.tag}`, true)
                    .addField(`${m.user.tag}さん。さようなら...`, "またどこかでお会いしましょう！", true)
                    .addField("バグ報告などはこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットではありません。", `ID：${m.user.tag}`)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#0x00FF00")
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            } else {
                checkbotsafety(m);
                const Embed = new DiscordJS.RichEmbed()
                    .addField("ボットがサーバーから退出しました。", `退出したボット：${m.user.tag}`, true)
                    .addField(`このボットを使用して${Blade.user.tag}に問題が発生した場合はこちらへ`, "https://discord.gg/DbTpjXV")
                    .addField("このボットの信頼性", checkbotsafety(), true)
                    .addField("このユーザーはボットです。", `ID：${m.user.id}`)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#0x00FF00")
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            }
        }
    });
function sendEmbed(context, message) {
    const Embed = new DiscordJS.RichEmbed()
        .setTitle(message)
        .setColor("#0x00FF00")
        .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4");
    context.channel.send(Embed);
}
function checkbotsafety(member) {
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
    ].includes(member.user.id)) return '認証済み'
    else if ([
        '410775769980338177', // Coded Beta
        '407775279642050560', // Coded
        '411900942577827840', // Blade
        '399018614382133248', // Red Music
        '388258872395300865', // Red Return
    ]) return '信頼'
    else return '不明'
}

console.timeEnd("全コードの読み込みにかかった時間");
