const canva = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send('# 을 제외한 HTML 색깔 코드를 입력하세요.');

    let image = await canva.color(`#${args[0]}`)
    let color = new MessageAttachment(image, "color.png");

    message.channel.send({ files: [color] })
}

module.exports.help = {
    name: "color",
    aliases: ["컬러", "색깔", "색"],
    category: "정보"
}