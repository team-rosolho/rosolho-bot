const { MessageEmbed } = require('discord.js');

function errorEmbed(message, text) {
    if (!message) throw new Error("message must be passed down as param!");
    if (!text) throw new Error('text must be passed down as param!');

    const embed = new MessageEmbed()
    .setDescription(text)
    .setColor("RED")

    message.channel.send({ embeds: [embed] });
}

module.exports = { errorEmbed }