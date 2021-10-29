const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const Model = require('../../models/MoneySchema');
const 영수증 = require('../../models/영수증');

module.exports.run = async (client, message, args) => {
    let item = args.join(" ");
    let data = Model.findOne({ UserId: message.author.id })
    if(!data) return message.channel.send('돈이 없습니다.');
    if(!item) {
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle('아이템 리스트')
        .setDescription(stripIndents`
        🎫 상품권
        프리미엄상품권 - 3만원
        `)
        .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }

    if(item === "프리미엄상품권") {
        let randomKey = Math.floor(Math.random() * 6000000000-0000)
        if(data.Money < 30000) return message.channel.send('3만원이 부족합니다.');
        new 영수증({
            PinCode: randomKey
        }).save().then(() => {
            message.channel.send('영수증이 DM 으로 전송되었습니다.');
            message.author.send('영수증이 발급되었습니다.\n상품명: 로쏠호봇 프리미엄상품권\n설명: 없음\n타입: 상품권\n사용방법: 로쏠호에게 보내세요. ! ! Rosolho#7684\n영수증 발급번호: ' + randomKey + ' (이거 꼭 사용하실때 필요합니다)');
        })
        data.Money -= 30000
        data.save();
    }
}

module.exports.help = {
    name: "buy",
    aliases: ["구매"]
}