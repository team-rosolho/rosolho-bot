const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const votes = await client.fetch('https://koreanbots.dev/api/v2/bots/880228837986811924').then(res => res.json()).then(res => res.data.votes);
    const embed = new MessageEmbed()
    .setColor("LIGHT_GREY")
    .setDescription('**봇 하트 누르기!**')
    .setFooter('하트 하나 눌러주시면 감사하겠습니다.!');
    const button = new MessageActionRow().addComponents(
        new MessageButton().setStyle("LINK").setLabel(`하트 갯수: ${votes}`).setURL("https://koreanbots.dev/bots/880228837986811924/vote")
    );

    message.channel.send({ embeds: [embed], components: [button] })
}

module.exports.help = {
    name: "heart",
    aliases: ["하트", "투표"]
}