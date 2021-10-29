const { MessageEmbed, Client, Message } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment-timezone');
moment.locale('ko-KR');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    let member = message.guild.members.cache.get(args[0]);

    if (!member && message.mentions.members) member = message.mentions.members.first();

    if (!member && args.join(" ")) {
        member = message.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(args.join(" ")) || member.user.tag.toLowerCase().includes(args.join(" "));
        });
    }

    if (!member) member = message.member;

    const embed = new MessageEmbed().setTitle(`${member.user.username} 님의 정보`).setFooter(member.user.username, member.user.displayAvatarURL()).setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor).setTimestamp()
    .addField(`유저 이름`, `**${member.user.username}**`)
    .addField(`디스플레이 이름`, stripIndents`**${member.displayName}**`)
    .addField(` 디스코드 태그`, `**${member.user.tag}**`)
    .addField(`디스코드 태그`, `**${member.user.tag}**`)
    .addField('🆔 ID', stripIndents`**${member.user.id}**`)

    if(member.presence.status !== "offline" && member.user.bot === false) {
        if(member.presence.clientStatus.desktop) {
            embed.addField(`디스코드 클라이언트`, `**🖥 앱**`)
        } else if(member.presence.clientStatus.web) {
            embed.addField(`디스코드 클라이언트`, `**⌨ 브라우저**`)
        } else if(member.presence.clientStatus.mobile) {
            embed.addField(`디스코드 클라이언트`, `**📱 휴대폰**`)
        }
    }

    embed.addField('상태', `**오프라인**`)
    .addField('📥 가입일', `**${moment(member.user.createdAt).tz('Asia/Seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)

    const embed2 = new MessageEmbed().setTitle(`${member.user.username} 님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild.id).size}개)`).setDescription(`**${member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "Everyone"}**`).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

    message.channel.send({ embeds: [embed, embed2] })
}

module.exports.help = {
    name: "userinfo",
    aliases: ["정보", "내정보", "user-info", "user-information", "user", "info-user", "user_info", "유저정보", "유저 정보"],
    category: "정보"
}