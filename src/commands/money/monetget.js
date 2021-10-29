const discord = require('discord.js');
const Canvas = require('canvas');

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    message.channel.send('현재 오류로 인하여, 돈받기 명령어를 사용할 수 없습니다.');
    //let add = Math.floor(Math.random() * 3000) + 1;
    //if(!data) client.money.create({ UserId: message.author.id, Money: add });
    //else {
    //    data.Money += add
    //    await data.save()
    //    message.channel.send(`${add}원을 받았습니다!`)
    //}
}

module.exports.help = {
    name: "moneyget",
    aliases: ["work", "돈받기", "돈빋기"],
    cooldown: 180
}