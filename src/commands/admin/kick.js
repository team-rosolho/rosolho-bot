const { MessageActionRow, MessageButton, Message, Client } = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send('이 명령어를 사용하려면 **멤버 추방하기** 권한이 필요해요.');
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('멤버를 입력하세요.');
    if(member.permissions.has("KICK_MEMBERS")) return message.channel.send('대상에게 **멤버 추방하기** 권한이 있습니다.');
    if(member.id === client.user.id) return message.channel.send('저를 추방할 수 없습니다.');
    if(member.id === message.author.id) return message.channel.send('자기 자신을 추방할 수 없습니다.');
    if(!member.kickable) return message.channel.send('역할이 높으므로, 추방할 수 없습니다.')
    let button = new MessageActionRow().addComponents([
        new MessageButton().setStyle("SUCCESS").setLabel('추방').setCustomId("kick"),
        new MessageButton().setStyle("DANGER").setLabel('취소').setCustomId("no1")
    ]);
    message.channel.send({ content: `정말로 ${member.user} 님을 추방하시겠습니까?`, components: [button] });

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Undefined";

    let filter = i => ["kick", "no1"].includes(i.customId) && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (button) => {
        await button.deferUpdate();
        if(button.customId === "kick") {
            collector.stop();
            member.kick();
            message.channel.send(`<@!${member.id}> 님을 추방하였어요.`);
            member.send(`Your Kicked For ${message.guild.name} Guild.\nReason: \`\`\`${reason}\`\`\``)
        } else if(button.customId === "no1") {
            collector.stop();
            message.channel.send(`${member.user} 님의 추방을 취소하였어요.`)
        }
    })
}

module.exports.help = {
    name: "kick",
    aliases: ["k", "ㅏ", "강퇴", "추방", "킥"],
    category: "관리자"
}