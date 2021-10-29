const { Client, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send('이 명령어를 사용하려면 **멤버 차단하기** 권한이 필요해요.');
    if(!args[0]) return message.channel.send('차단을 해제할 유저의 ID 를 입력하세요.');

    message.guild.members.unban(args[0])
    message.channel.send(`**${client.users.cache.get(args[0]).tag}** 님의 차단이 해제되었습니다.`)
}

module.exports.help = {
    name: "unban",
    aliases: ["unbanish", "ub", "ubi", "언밴", "언벤", "차단해제"],
    category: "관리자"
}