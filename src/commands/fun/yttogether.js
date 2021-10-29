module.exports.run = async (client, message, args) => {
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send('이 명령어는 음성채널에서 시도해 주세요.');

    client.fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 3600,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })

    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send('error');
        const embed = new (require('discord.js')).MessageEmbed()
        .setColor("BLUE")
        .setTitle('클릭하세요! 참고로 이 링크는 1시간 동안만 유효해요!!')
        .setURL(`https://discord.com/invite/${invite.code}`)
        message.channel.send({ embeds: [embed] })
    })
}

module.exports.help = {
    name: "youtube-together",
    aliases: ["유튜브", "youtube", "yt", "ytt"],
    category: "기본"
}