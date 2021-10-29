const { MessageEmbed, Client, Message } = require('discord.js');
const moment = require('moment-timezone')
moment.locale('ko-KR')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    if(message.channel.type === "DM") return message.channel.send('DM이 서버였나..?');
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name} 서버의 정보`)
    .setColor(0xffff00)
    .setThumbnail(message.guild.iconURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    .addField('🆔 서버 ID', `**${message.guild.id}**`)
    .addField('🙎‍♂️ 서버 유저', `**전체: ${message.guild.memberCount} (유저: ${message.guild.members.cache.filter(member => !member.user.bot).size}명 | 봇: ${message.guild.members.cache.filter(member => member.user.bot).size}개)**`)
    .addField('🎂 서버 생일', `**${moment(message.guild.createdAt).tz('Asia/Seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)
    .addField('💬 채널', `**전체: ${message.guild.channels.cache.size} (텍스트: ${message.guild.channels.cache.filter(x => x.type === "GUILD_TEXT").size}개 | 카테고리: ${message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY").size}개 | 음성: ${message.guild.channels.cache.filter(x => x.type === "GUILD_VOICE").size}개)**`)
    .addField('💤 잠수 채널', `**${message.guild.afkChannel ? message.guild.afkChannel.name : "없음"}**`, true)
    .addField('👑 서버 주인', `<@!${message.guild.ownerId}> (${(await message.guild.fetchOwner()).user.tag})`)
    
    message.guild.afkChannel ? embed.addField('⏰ 잠수 시간 제한', `**${afkTimeout[message.guild.afkTimeout]}**`, true) : null

    embed.addField('🔐 보안 등급', `**${verificationLevel[message.guild.verificationLevel]}**`)
    .addField('📱 2단계 인증', `**${mfaLevel[message.guild.mfaLevel ? message.guild.mfaLevel : "없음"]}**`)
    .addField('📡 시스템 메시지 채널', `**${message.guild.systemChannel ? message.guild.systemChannel : "없음"}**`)
    .addField('📺 유해 미디어 콘텐츠 필터', `**${explicitContentFilter[message.guild.explicitContentFilter]}**`)
    .addField('🔔 알림 설정 초기화', `**${defaultMessageNotifications[message.guild.defaultMessageNotifications]}**`)
    .addField('🎙 음성 채널에 접속한 수', `**${message.guild.voiceStates.cache.size}명**`)
    .addField('💎 부스트 레벨', `**${boostLevel[message.guild.premiumTier]}레벨**`, true)
    .addField('💎 부스트 횟수', `**${message.guild.premiumSubscriptionCount}회**`, true)

    const roleembed = new MessageEmbed().setColor(0xffff00).setTitle(`${message.guild.name} 서버의 역할 (${message.guild.roles.cache.filter(r => r.id !== message.guild.id).size}개)`).setDescription(message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(e => e).join(", "));

        if (message.guild.roles.cache.filter(r => r.id !== message.guild.id).size > 25) {
            roleembed.setDescription(message.guild.roles.cache.filter(n => n.id !== message.guild.id).map(e => e).splice(0, 25).join(", "));
            roleembed.setTitle(`${message.guild.name} 서버의 역할 (${message.guild.roles.cache.filter(r => r.id !== message.guild.id).size}개 중 25개)`);
        };


        const emojiembed = new MessageEmbed().setColor(0xffff00).setTitle(`${message.guild.name} 서버의 이모지 (${message.guild.emojis.cache.size}개)`).setDescription(message.guild.emojis.cache.map(e => e.toString()).join(" "));

        if (message.guild.emojis.cache.size > 30) {
            emojiembed.setDescription(message.guild.emojis.cache.map(e => e.toString()).splice(0, 30).join(" "));
            emojiembed.setTitle(`${message.guild.name} 서버의 이모지 (${message.guild.emojis.cache.size}개 중 30개)`);
        };

        message.channel.send({ embeds: [embed] });

        if (message.member.permissions.has("MANAGE_ROLES") && message.guild.me.permissions.has("MANAGE_ROLES") && message.guild.roles.cache.filter(e => e.id !== message.guild.id).size !== 0) message.channel.send({ embeds: [roleembed] })
        if (message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS") && message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") && message.guild.emojis.cache.size !== 0) message.channel.send({ embeds: [emojiembed] });
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["서버정보", "정보서버", "정보 서버", "서정", "server-info", "서버 정보"],
    category: "정보"
}

const afkTimeout = {
    60: '1분',
    300: '5분',
    900: '15분',
    1800: '30분',
    3600: '1시간'
};

const verificationLevel = {
    NONE: '제한 없음',
    LOW: '이메일이 인증이 완료된 Disocrd 계정',
    MEDIUM: 'Discord에 가입한 지 5분',
    HIGH: '이 서버에 멤버가 된 지 10분',
    VERY_HIGH: '휴대폰 인증이 완료된 Discord 계정'
};

const mfaLevel = ['없음', '활성화'];

const explicitContentFilter = {
    DISABLED: '미디어 콘텐츠를 스캔하지 않음',
    MEMBERS_WITHOUT_ROLES: '역할 없는 멤버의 미디어 콘텐츠를 스캔',
    ALL_MEMBERS: '모든 멤버의 미디어 콘텐츠를 스캔'
};

const defaultMessageNotifications = {
    ALL: '모든 메세지',
    MENTIONS: '@mentions만'
};

const boostLevel = {
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3
}