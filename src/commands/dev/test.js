const { MessageEmbed, MessageButton } = require('discord.js');
const { embeds } = require('../../helpers');

module.exports.run = async (client, message, args) => {
    message.channel.send('아직 준비된 테스트가 없습니다.')
}

module.exports.help = {
    name: "test"
}