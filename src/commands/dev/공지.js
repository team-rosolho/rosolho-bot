const Discord = require('discord.js');
let channel = "로쏠호봇-공지";

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    let text = args.join(" ");
    if(!text) return message.channel.send('공지 내용을 입력하세요.')

    message.channel.send('공지 전송중...')
    .then(async msg => {
        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle('로쏠호봇 공지')
        .setDescription(`${text}`)
        .setTimestamp()
        client.guilds.cache.forEach(guild => {
            const gchannel = guild.channels.cache.find(x => x.name === "📢ㅣ로쏠호봇")
            try {
                gchannel.send({ embeds: [embed] });
                if(!gchannel) return;
            } catch (err) {
                return console.log(err)
            }
        })
        await msg.edit('공지가 성공적으로 전송되었습니다!')
    })
}

module.exports.help = {
    name: "공지",
    aliases: [],
    devOnly: true
}