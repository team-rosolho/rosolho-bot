const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle('π μνμ')
    .setDescription(`${days}μΌ ${hours}μκ° ${minutes}λΆ ${seconds}μ΄`)
    message.channel.send({ embeds: [embed] })
};

module.exports.help = {
    name: "uptime",
    aliases: ["μνμ"]
}