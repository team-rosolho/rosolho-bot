const { stripIndents } = require('common-tags');
const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @param {*} prefix 
 */
module.exports.run = async (client, message, args, prefix, usage) => {
    const { commands } = message.client;

    if (!args.length) {
        let helpEmbed = new MessageEmbed()
        .setColor(0x4286f4)
        .setTitle('안녕하세요! 로쏠호봇이에요!')
        .setDescription("`" + commands.map((command) => command.help.name).join("`, `") + "`")

        .addField('더 정확하게 보는 방법', `${prefix}도움말 [명령어이름] 을 하면 명령어의 정보를 더 정확하게 알 수 있어요.`)

        return message.author.send({embeds: [helpEmbed] }).then(() => {
            if (message.channel.type === "DM") return;

            message.reply('DM 으로 명령어를 보내드렸어요.')
        }).catch(() => {
            message.channel.send({ content: "뒷메 방지를 하신거 같아서 채널에 보낼게요!", embeds: [helpEmbed] })
        });
    }

    const name = args[0].toLowerCase();

    const command = commands.get(name) || commands.find((c) => c.help.aliases.includes(name));

    if(!command) return message.channel.send('그런 명령어는 없어요!');

    let commandEmbed = new MessageEmbed()
    .setColor(0x4286f4)
    .setTitle(`커맨드 - ${name}`);

    if (command.help.description) commandEmbed.setDescription(`${command.help.description}`);

    if (command.help.aliases) commandEmbed.addField('다른 명령어들', `\`${command.help.aliases.join(", ")}\``, true)
    if (command.help.usage) commandEmbed.addField("사용방법", `\`${command.help.usage}\``, true)
    if (command.help.devOnly && command.help.devOnly === true) commandEmbed.addField("개발자 명령어", '이 명령어는 개발자 명령어입니다.', true);

    message.channel.send({ embeds: [commandEmbed] })

    const button = new MessageActionRow().addComponents(
        new MessageButton().setStyle("LINK").setURL('https://discord.gg/ZUbNTUx6E2').setLabel('로쏠호봇 서포트 서버')
    )
}

module.exports.help = {
    name: "help",
    aliases: ["도움", "도움말", "헬프", "h", "ㅗ", "ㅗ디ㅔ"],
    usage: "<명령어 이름>",
    description: "도움 명령어입니다."
}