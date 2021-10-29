const prem = require('../../models/PremiumSchema');
const premKey = require('../../models/PremiumKey');
const canvas = require('canvas');

canvas.module

module.exports.run = async ( client, message, args ) => {
    if(!args[0]) return message.channel.send('키를 입력하세요.')
    premKey.findOne({ Key: args[0] }, async (err, data) => {
        if (!data) return message.reply('해당 키는 일치하지 않습니다.');
        prem.findOne({ UserId: message.author.id }, async (err, data) => {
            if (!data) {
                new prem({
                    UserId: message.author.id,
                    premium: true
                }).save();
                premKey.deleteOne({ Key: args[0] }).exec();
                message.reply('프리미엄이 적용되었습니다! 축하합니다!')
            } else {
                message.delete();
                message.reply('이미 당신은 프리미엄이 적용되어 있습니다.')
            }
        })
    })
}

module.exports.help = {
    name: "redeem",
    aliases: ["프리미엄", "쿠폰", "coupon", "리딤"],
    category: "기본"
}