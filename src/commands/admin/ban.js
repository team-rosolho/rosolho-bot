const { MessageActionRow, MessageButton, Message, Client } = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send('이 명령어를 사용하려면 **멤버 차단하기** 권한이 필요해요.');
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('멤버를 입력하세요.');
    if(member.permissions.has("BAN_MEMBERS")) return message.channel.send('대상에게 **멤버 차단하기** 권한이 있습니다.');
    if(member.id === client.user.id) return message.channel.send('저를 차단할 수 없습니다.');
    if(member.id === message.author.id) return message.channel.send('자기 자신을 차단할 수 없습니다.');
    if(!member.bannable) return message.channel.send('역할이 높으므로, 추방할 수 없습니다.')
    let button = new MessageActionRow().addComponents([
        new MessageButton().setStyle("SUCCESS").setLabel('차단').setCustomId("yes"),
        new MessageButton().setStyle("DANGER").setLabel('취소').setCustomId("no")
    ]);
    message.channel.send({ content: `정말로 ${member.user} 님을 차단하시겠습니까?`, components: [button] });

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Undefined";

    let filter = i => ["yes", "no"].includes(i.customId) && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (button) => {
        await button.deferUpdate();
        if(button.customId === "yes") {
            collector.stop();
            member.ban({ reason: reason });
            message.channel.send(`<@!${member.id}> 님을 차단하였어요.`);
            member.send(`Your Banned For ${message.guild.name} Guild.\nReason: \`\`\`${reason}\`\`\``)
        } else if(button.customId === "no") {
            collector.stop();
            message.channel.send(`${member.user} 님의 차단을 취소하였어요.`)
        }
    })
}

module.exports.help = {
    name: "ban",
    aliases: ["밴", "차단", "ㅠ무", "b", "banish", "ㅠ무ㅑ노", "벤"],
    category: "관리자"
}