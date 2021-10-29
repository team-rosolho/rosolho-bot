const { MessageButton } = require('discord.js');
const client = require('../..');

module.exports.run = async (clinet, message, args) => {
    let msg = args.join(" ");
    if(!msg) return message.channel.send('문의할 내용을 입력해 주세요.');

    let button = new (require('discord.js')).MessageActionRow().addComponents(
        new MessageButton().setStyle("SUCCESS").setEmoji('✅').setCustomId('yes2'),
        new MessageButton().setStyle("DANGER").setEmoji('❎').setCustomId('no2')
    );

    message.channel.send({ content: "정말로 문의하시겠습니까? 문의하는 즉시 로쏠호에게 DM이 갑니다.", components: [button] });

    let filter = i => ['yes2', 'no2'].includes(i.customId) && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async collected => {
        await collected.deferUpdate();

        if(collected.customId === 'yes2') {
            collector.stop();
            message.reply('접수가 완료되었습니다. 만약 욕설이 들어가 있다면, 봇 사용 영구정지 당할 수 있습니다.');
            client.users.cache.get('902792294858633236').send(`${message.author.id} (${message.author.tag}) : ${msg}`)
        } else if(collected.customId === 'no2') {
            collector.stop();
            message.reply('접수가 취소되었습니다.');
        }
    })
}

module.exports.help = {
    name: "question",
    aliases: ["건의", "문의"]
}