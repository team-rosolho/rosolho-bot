const Model = require('../../models/PremiumSchema');
const { Client, Message } = require('discord.js');

/**
 * 
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 * @returns
 */

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send('유저를 입력하세요.');
    let member = client.users.cache.get(args[0]);
    let data = Model.findOne({
        UserId: member.id
    })

    if(!data) return message.channel.send('해당 유저는 프리미엄이 아닙니다.');

    Model.deleteOne({ UserId: member.id }).exec();

    message.channel.send(`**${member.tag}** 님의 프리미엄을 해제시켰습니다. (음악 명령어 사용 불가능)`)
}

module.exports.help = {
    name: "프리미엄정지",
    aliases: [],
    devOnly: true
}