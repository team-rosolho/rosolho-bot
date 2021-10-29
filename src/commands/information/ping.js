const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle("퐁!")
    if (Math.round(client.ws.ping) > 100) {
        embed.setColor("RED")
        embed.setDescription(`핑: ${client.ws.ping}ms\n상태: 🔴 과부하!`)
        embed.setFooter('과부하로 인하여 봇이 자동으로 종료될 수 있습니다.')
        message.channel.send({ embeds: [embed] })
    } else {
        embed.setColor("GREEN")
        embed.setDescription(`핑: ${client.ws.ping}ms\n상태: 🟢 정상`)
        embed.setFooter('현재 핑이 매우 좋아요! 봇이 꺼질 걱정은 안하셔도 되요!')
        message.channel.send({ embeds: [embed] })
    }
}

module.exports.help = {
    name: "ping",
    aliases: ["핑", "퐁", "pong", "ㅔㅑㅜㅎ", "ㅔㅐㅜㅎ"],
    category: "정보"
}