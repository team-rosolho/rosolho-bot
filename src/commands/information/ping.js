const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle("ν!")
    if (Math.round(client.ws.ping) > 100) {
        embed.setColor("RED")
        embed.setDescription(`ν: ${client.ws.ping}ms\nμν: π΄ κ³ΌλΆν!`)
        embed.setFooter('κ³ΌλΆνλ‘ μΈνμ¬ λ΄μ΄ μλμΌλ‘ μ’λ£λ  μ μμ΅λλ€.')
        message.channel.send({ embeds: [embed] })
    } else {
        embed.setColor("GREEN")
        embed.setDescription(`ν: ${client.ws.ping}ms\nμν: π’ μ μ`)
        embed.setFooter('νμ¬ νμ΄ λ§€μ° μ’μμ! λ΄μ΄ κΊΌμ§ κ±±μ μ μνμλ λμ!')
        message.channel.send({ embeds: [embed] })
    }
}

module.exports.help = {
    name: "ping",
    aliases: ["ν", "ν", "pong", "γγγγ", "γγγγ"],
    category: "μ λ³΄"
}