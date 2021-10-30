'use strict';

console.log('Loading...');
const { Client, Collection, MessageAttachment } = require('discord.js');
const fs = require('fs')
const client = new Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"] });

const sleep = ms => new Promise(r => setTimeout(r, ms));
client.commands = new Collection();
client.slashcommands = new Collection();
client.aliases = new Collection();
client.money = require('./models/MoneySchema');
client.fetch = require('node-fetch');
const ms = require('ms');
const { errorEmbed } = require('./helpers/embed');
const User = require('./models/PremiumSchema');
const { createCmd } = require('./dataHandler');
const config = require('./client');
const { message } = require('noblox.js');
const { CaptchaGenerator } = require('captcha-canvas');

module.exports = client;

process.on('unhandledRejection', () => {
    console.log('로쏠호봇 To 부활ed')
})

fs.readdirSync('./src/commands/').forEach(dir => {
    fs.readdir(`./src/commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js")

        if(jsFiles.length <= 0) return console.log("=231-2-32=")

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`커맨드 ${file} is loaded`)

            try {
                client.commands.set(fileGet.help.name, fileGet)
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name)
                })
            } catch (err) {
                return console.log(err);
            }
        })
    })
})

fs.readdirSync('./src/slashcommands/').forEach(dir => {
    fs.readdir(`./src/slashcommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log('=251-9-35=');

        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);
            console.log(`빗금 명령어 ${file} 이(가) 로드되었습니다.`)

            try {
                client.slashcommands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        })
    })
})

client.on('interactionCreate', async inter => {
    let slashCmds = client.slashcommands.get(inter.commandName)
    if(slashCmds) slashCmds.run(client, inter)
})
.on('ready', async () => {
    console.log(`---------------------[System]---------------------\nLogined Token: ${client.token}\nLogined Username: ${client.user.username}\nLogined Tag: ${client.user.tag}`)
    client.user.setStatus("idle")
    client.user.setActivity(`${config.prefix}도움말 | ${client.guilds.cache.size}개의 서버와 함께 하는중`, { type: "WATCHING" })
    createCmd(client);
})
.on('messageCreate', async message => {
    if(message.author.bot) return;

    let prefix = config.prefix
    let data = User.findOne({ User: message.author.id });
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)
    message.data = { args: args, cmd: cmd, array: messageArray }

    module.exports.arg = args;

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if(commands) {
        if(!message.content.startsWith(prefix)) return;
        if(!commands.help.premium) {
            
        } else if(commands.help.premium === true && !data) {
            return message.channel.send('해당 명령어는 프리미엄 전용 명령어입니다.');
        }
        if(!commands.help.devOnly) {

        } else if(commands.help.devOnly === true && (message.author.id !== '902792294858633236')) {
            return message.channel.send('이 명령어는 로쏠호봇 개발자 전용 명령어입니다.')
        }
        if(commands.help.permission === '서버 관리하기' && !(message.member.permissions.has("MANAGE_GUILD"))) return new errorEmbed(message, "이 명령어를 사용하려면 **서버 관리하기** 권한이 필요합니다.")
        else if(commands.help.permission === '메시지 관리하기' && !(message.member.permissions.has("MANAGE_MESSAGES"))) return new errorEmbed(message, "이 명령어를 사용하려면 **메시지 관리하기** 권한이 필요합니다.")
        commands.run(client, message, args, prefix);
    }
})
.on('guildCreate', async guild => {
    guild.channels.create('📢ㅣ로쏠호봇', {
        permissionOverwrites: [{
            id: guild.roles.everyone,
            deny: "SEND_MESSAGES"
        }, {
            id: client.user.id,
            allow: "SEND_MESSAGES"
        }]
    }).then(async msg => {
        msg.send('이 채널은 공지를 수신받는 채널입니다. 만약 삭제하셨다면 `📢ㅣ로쏠호봇` 채널로 다시 생성하시거나, 봇을 다시 초대해 주세요.')
    })
})

require('./mongo')();
client.login(config.token);