const DiscordJS = require("discord.js");
var Blade = new DiscordJS.Client()
const { parsed: Config } = require('dotenv').load()
Blade.login(Config.Token);
console.time("全コードの読み込みにかかった時間");
console.time("ログインにかかった時間");
const Request = require("request"),
    fetch = require('node-fetch')
//Japanese = require("./language/ja_jp.json",
//English = require("./language/en_us.json"),
//Language = Config.Language,
var Prefix = Config.Prefix,
    TemporaryFileContents = "",
    botsafemsg = "",
    Split,
    Embed,
    options = {
        url: "https://srhpyqt94yxb.statuspage.io/api/v2/summary.json",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        json: true,
    },
    options2 = {
        url: "https://srhpyqt94yxb.statuspage.io/api/v2/incidents.json",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        json: true,
    },
    optionstranslate = {
    };

Blade
    .on("ready", () => {
        console.timeEnd("ログインにかかった時間");
        Blade.user.setStatus("available")
        Blade.user.setPresence({
            game: {
                name: "djs-jpn.ga | Type " + Prefix + "help to show help",
                type: 1
            }
        });
        console.log("ログイン成功 | Login success\nこのボットはDJS-JPNによって開発されました | This bot is developed by DJS-JPN\nボットを停止するにはターミナルで Ctrl + C を押すようお願いします | Press Ctrl + C on terminal to stop the this bot");
    })

    .on("message", async m => {
        if (m.author.bot) return;
        if (!m.content.startsWith(Prefix)) return;
        Split = m.content.slice(Prefix.length).split(" ");
        switch (Split[0]) {
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
                            "value": "コマンド一覧を表示"
                        },
                        {
                            "name": "ping",
                            "value": "Pingを確認",
                        },
                        {
                            "name": "avatar",
                            "value": "自分のプロフィール画像を表示",
                        },
                        {
                            "name": "translate | t",
                            "value": "テキストを翻訳",
                        },
                        {
                            "name": "discordstats",
                            "value": "Discordのサーバー状態を確認",
                        },
                        {
                            "name": "公式サイト",
                            "value": "https://djs-jpn.ga",
                            "inline": true
                        },
                        {
                            "name": "バグ報告・公式Discordサーバー",
                            "value": "https://discord.gg/DbTpjXV",
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
                break;
            case "ping":
                sendEmbed(m, "ポン！Pingの確認に成功しました！ボットのPingは" + Math.floor(Blade.ping) + "msです！"/*このメッセージの作成速度は" + new Date().getTime() - m.createdTimestamp + "msです！"*/);
                break;
            case "avatar":
                m.reply(m.author.avatarURL);
                break;
            case "serverstats":
                //サーバーステータス
                break;
            case "translate":
            case "t":
                if (!Split[1]) {
                    sendEmbed(m, "翻訳したい言語を入力してください。");
                } else {
                    if (!Split[2]) {
                        sendEmbed(m, "翻訳したい内容を入力してください。")
                    } else {
                        optionstranslate = {
                            method: "POST",
                            url: "https://translate.google.com/translate_a/single" + "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8" + "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e",
                            headers: {
                                'Content-Type': "application/json; charset=utf-8",
                                'User-Agent': "AndroidTranslate",
                            },
                            form: {
                                "sl": "auto",
                                "tl": Split[1],
                                "q": m.content.slice(m.content.search(Split[2])),
                            },
                            json: true,
                        }
                    }
                    console.log(m.content.slice(m.content.search(Split[2])));
                    Request(optionstranslate, function (e, r, b) {
                        if (e) {
                            sendEmbed(m, "翻訳に失敗しました。翻訳する内容または翻訳先の言語が無効な可能性があります。")
                        } else {
                            m.channel.send(m.author.tag + ":" + b.sentences[0].trans + "\nOriginal:" + m.content.slice(m.content.search(Split[2])));
                        }
                    });
                }
                break;
            case "discordstats":
                m.channel.startTyping();
                console.time("サーバーの状態の取得にかかった時間");
                const _summary = await fetch('https://status.discordapp.com/api/v2/summary.json')
                const _incidents = await fetch('https://status.discordapp.com/api/v2/incidents.json')
                const summary = await _summary.json()
                const incidents = await _incidents.json()
                const status = summary.components.map(e => ({
                    name: e.name,
                    value: (e.status === 'operational') ? '正常' : '不安定',
                    inline: true,
                }))
                const allstats = (summary.status.description == 'All Systems Operational')
                    ? '全サーバーは正常です。'
                    : 'サーバーが不安定な可能性があります。'
                const maintenance = {
                    at: incidents.incidents[0].created_at,
                    resolved: (incidents.incidents[0].status == "resolved")
                        ? '解決済み'
                        : '未解決',
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
                sendEmbed(m, "不明なコマンドです。" + Prefix + "helpでコマンドに誤字、脱字、コマンドが存在するか確認をお願いいたします。")
                break;
        }
    })
    .on('guildMemberAdd', m => {
        if (Config.WelcomeChannel != "disable") {
            if (m.user.bot == false) {
                Embed = new DiscordJS.RichEmbed()
                    .addField("新しいユーザーがサーバーに参加しました。", "参加したユーザー：" + m.user.tag, true)
                    .addField(m.user.username + "さん。ようこそ！", Prefix + "helpでコマンド一覧を確認できます！", true)
                    .addField("バグ報告などはこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットではありません。", "ID：" + m.user.id)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#FFFFFF");
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            } else {
                checkbotsafety(m);
                Embed = new DiscordJS.RichEmbed()
                    .addField("新しいボットがサーバーに参加しました。", "参加したボット：" + m.user.tag, true)
                    .addField("このボットの信頼性", botsafemsg, true)
                    .addField("このボットを使用して" + Blade.user.id + "に問題が発生した場合はこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットです。", "ID：" + m.user.id)
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
                Embed = new DiscordJS.RichEmbed()
                    .addField("ユーザーがサーバーから退出しました。", "退出したユーザー：" + m.user.tag, true)
                    .addField(m.user.username + "さん。さようなら...", "またどこかでお会いしましょう！", true)
                    .addField("バグ報告などはこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このユーザーはボットではありません。", "ID：" + m.user.id)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#0x00FF00")
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            } else {
                checkbotsafety(m);
                Embed = new DiscordJS.RichEmbed()
                    .addField("ボットがサーバーから退出しました。", "退出したボット：" + m.user.tag, true)
                    .addField("このボットを使用して" + Blade.user.id + "に問題が発生した場合はこちらへ", "https://discord.gg/DbTpjXV")
                    .addField("このボットの信頼性", botsafemsg, true)
                    .addField("このユーザーはボットです。", "ID：" + m.user.id)
                    .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                    .setThumbnail(m.user.avatarURL)
                    .setColor("#0x00FF00")
                Blade.channels.get("name", Config.WelcomeChannel).send(Embed);
            }
        }
    });
function sendEmbed(context, message) {
    Embed = new DiscordJS.RichEmbed()
        .setTitle(message)
        .setColor("#0x00FF00")
        .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4");
    context.channel.send(Embed);
}
function checkbotsafety(context) {
    if (
        m.user.id == "235088799074484224" || /*Rythm*/
        m.user.id == "155149108183695360" || /*Dyno*/
        m.user.id == "222853335877812224" || /*Server Hound*/
        m.user.id == "294882584201003009" || /*Giveaway bot*/
        m.user.id == "245675252821000193" || /*Gaius Cicereius*/
        m.user.id == "367317166573355008" || /*うううさんのRPGⅡ*/
        m.user.id == "346650373613682688" || /*ボットちゃん*/
        m.user.id == "378929559862640650" || /*sou-trade*/
        m.user.id == "404873188947001355" || /*C-Coin*/
        m.user.id == "406292122963017749" || /*C-Casino*/
        m.user.id == "394876010438328321" || /*Greeting Bot*/
        m.user.id == "83010416610906112" || /*Night Bot*/
        m.user.id == "153613756348366849" || /*Typical Bot*/
        m.user.id == "265218275451863041" || /*GuideBot*/
        m.user.id == "241694957490929664" || /*MDN Duh*/
        m.user.id == "172002275412279296" || /*Tatsumaki*/
        m.user.id == "376433393262526476" || /*DSL Bot*/
        m.user.id == "324829950639341568" || /*Discordちゃんねる*/
        m.user.id == "302050872383242240" || /*Disboard*/
        m.user.id == "240545475118235648" /*BugBot*/
    ) {
        botsafemsg = "認証済み";
    } else if (
        m.user.id == "410775769980338177" || /*Coded Beta*/
        m.user.id == "407775279642050560" || /*Coded*/
        m.user.id == "411900942577827840" || /*Blade*/
        m.user.id == "399018614382133248" || /*Red Music*/
        m.user.id == "388258872395300865" /*Red Return*/
    ) {
        botsafemsg = "信頼";
    } else {
        botsafemsg = "不明";
    }
}
console.timeEnd("全コードの読み込みにかかった時間");
