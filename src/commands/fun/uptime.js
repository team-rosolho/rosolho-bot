const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle('🕘 업타임')
    .setDescription(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`)
    message.channel.send({ embeds: [embed] })
};

module.exports.help = {
    name: "uptime",
    aliases: ["업타임"]
}