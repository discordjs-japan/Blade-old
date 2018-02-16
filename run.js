console.time("全コードの読み込みにかかった時間");
const DiscordJS = require("discord.js"),
    File = require("fs"),
    FileExtra = require("fs-extra"),
    Request = require("request");
var Blade = new DiscordJS.Client();
var Config = require("./config.json")
Blade.login(Config.token);
console.time("ログインにかかった時間");
var Prefix = "./",
    Lang = "ja_jp",
    TemporaryFileContents = "",
    apistats = "",
    euweststats = "",
    gatewaystats = "",
    cloudflarestats = "",
    eucentralstats = "",
    mediaproxystats = "",
    voicestats = "",
    singaporestats = "",
    japanstats = "",
    russiastats = "",
    hongkongstats = "",
    uscentralstats = "",
    useaststats = "",
    ussouthstats = "",
    usweststats = "",
    brazilstats = "",
    allstats = "",
    Split,
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
        console.log("ログイン成功 | Login success\nこのボットはDJS-JPNによって開発されました | This bot is developed by DJS-JPN\nボットを停止するにはターミナルで Ctrl + C を押すようお願いします。 | Press Ctrl + C on terminal to stop the this bot");
    })

    .on("message", m => {
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
                            "name": "translate",
                            "value": "テキストを翻訳",
                        },
                        {
                            "name": "discordstats",
                            "value": "Discordのサーバー状態を確認",
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
                break;
            case "ping":
                sendEmbed(m, "Pong！Pingの確認に成功しました！ボットのPingは" + Blade.ping + "msです！"/*このメッセージの作成速度は" + new Date().getTime() - m.createdTimestamp + "msです！"*/);
                break;
            case "avatar":
                m.reply(m.author.avatarURL);
                break;
            case "serverstats":
                //サーバーステータス
                break;
            case "translate":
                if (!Split[1]) {
                    sendEmbed(m, "翻訳したい内容を入力してください。");
                } else {
                    if (!Split[2]) {
                        optionstranslate = {
                            method: "POST",
                            url: "https://translate.google.com/translate_a/single" + "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8" + "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e",
                            headers: {
                                'Content-Type': "application/json; charset=utf-8",
                                'User-Agent': "AndroidTranslate",
                            },
                            form: {
                                "sl": "auto",
                                "tl": "ja_jp",
                                "q": Split[1],
                            },
                            json: true,
                        }
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
                                "tl": Split[2],
                                "q": Split[1],
                            },
                            json: true,
                        }
                    }
                    Request(optionstranslate, function (e, r, b) {
                        if (e) {
                            sendEmbed(m, "内部エラーが発生しました。翻訳する内容または翻訳先の言語が無効な可能性があります。")
                        } else {
                            sendEmbed(m, "翻訳結果：" + b.sentences[0].trans)
                        }
                    });
                }
                break;
            case "discordstats":
                m.channel.startTyping();
                console.time("サーバーの状態の取得にかかった時間");
                Request(options, function (e, r, b) {
                    if (b.components[0].status == "operational") {
                        apistats = "正常";
                    } else {
                        apistats = "不安定";
                    }
                    if (b.components[1].status == "operational") {
                        euweststats = "正常";
                    } else {
                        euweststats = "不安定";
                    }
                    if (b.components[2].status == "operational") {
                        gatewaystats = "正常";
                    } else {
                        gatewaystats = "不安定";
                    }
                    if (b.components[4].status == "operational") {
                        cloudflarestats = "正常";
                    } else {
                        cloudflarestats = "不安定";
                    }
                    if (b.components[6].status == "operational") {
                        mediaproxystats = "正常";
                    } else {
                        mediaproxystats = "不安定";
                    }
                    if (b.components[3].status == "operational") {
                        eucentralstats = "正常";
                    } else {
                        eucentralstats = "不安定";
                    }
                    if (b.components[5].status == "operational") {
                        singaporestats = "正常";
                    } else {
                        singaporestats = "不安定";
                    }
                    if (b.components[16].status == "operational") {
                        japanstats = "正常";
                    } else {
                        japanstats = "不安定";
                    }
                    if (b.components[15].status == "operational") {
                        russiastats = "正常";
                    } else {
                        russiastats = "不安定";
                    }
                    if (b.components[14].status == "operational") {
                        hongkongstats = "正常";
                    } else {
                        hongkongstats = "不安定";
                    }
                    if (b.components[9].status == "operational") {
                        uscentralstats = "正常";
                    } else {
                        uscentralstats = "不安定";
                    }
                    if (b.components[10].status == "operational") {
                        useaststats = "正常";
                    } else {
                        useaststats = "不安定";
                    }
                    if (b.components[11].status == "operational") {
                        ussouthstats = "正常";
                    } else {
                        ussouthstats = "不安定";
                    }
                    if (b.components[12].status == "operational") {
                        usweststats = "正常";
                    } else {
                        usweststats = "不安定";
                    }
                    if (b.components[13].status == "operational") {
                        brazilstats = "正常";
                    } else {
                        brazilstats = "不安定";
                    }
                    if (b.components[8].status == "operational") {
                        voicestats = "正常";
                    } else {
                        voicestats = "不安定";
                    }
                    if (b.status.description == "All Systems Operational") {
                        allstats = "全サーバーは正常です。";
                    } else {
                        allstats = "サーバーが不安定な可能性があります。";
                    }
                    Request(options2, function (e, r, b) {
                        lastmaintenances = b.incidents[0].created_at;
                        if (b.incidents[0].status == "resolved") {
                            lastmaintenancesresolved = "解決済み";
                        } else {
                            lastmaintenancesresolved = "未解決";
                        }
                        console.timeEnd("サーバーの状態の取得にかかった時間");
                        m.channel.stopTyping();
                        Embed = new DiscordJS.RichEmbed()
                            .addField("サーバーの状態", allstats)
                            .addField("API", apistats, true)
                            .addField("Gateway", gatewaystats, true)
                            .addField("CloudFlare", cloudflarestats, true)
                            .addField("Media Proxy", mediaproxystats, true)
                            .addField("Voice", voicestats, true)
                            .addField("EU West", euweststats, true)
                            .addField("EU Central", eucentralstats, true)
                            .addField("Singapore", singaporestats, true)
                            .addField("Japan", japanstats, true)
                            .addField("Russia", russiastats, true)
                            .addField("Hong Kong", russiastats, true)
                            .addField("US Central", uscentralstats, true)
                            .addField("US East", useaststats, true)
                            .addField("US South", ussouthstats, true)
                            .addField("US West", usweststats, true)
                            .addField("Brazil", brazilstats, true)
                            .addField("最後に行われたメンテナンス", lastmaintenances + "（" + lastmaintenancesresolved + "）")
                            .setColor("#0x00FF00")
                            .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4")
                        m.channel.send(Embed);
                        apistats = "";
                        euweststats = "";
                        gatewaystats = "";
                        cloudflarestats = "";
                        eucentralstats = "";
                        mediaproxystats = "";
                        voicestats = "";
                        singaporestats = "";
                        japanstats = "";
                        russiastats = "";
                        hongkongstats = "";
                        uscentralstats = "";
                        useaststats = "";
                        ussouthstats = "";
                        usweststats = "";
                        brazilstats = "";
                        allstats = "";
                    });
                });
                break;
            default:
                sendEmbed(m, "不明なコマンドです。" + Prefix + "helpでコマンドに誤字、脱字、コマンドが存在するか確認をお願いいたします。")
                break;
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
        .setColor("#0x00FF00")
        .setFooter("DEVELOPED BY DJS-JPN", "https://avatars3.githubusercontent.com/u/35397294?s=200&v=4");
    context.channel.send(Embed);
}
console.timeEnd("全コードの読み込みにかかった時間");
