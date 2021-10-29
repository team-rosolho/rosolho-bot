const prem = require('../../models/PremiumSchema');
const premkey = require('../../models/PremiumKey');

module.exports.run = async (client, message, args) => {
    new premkey({
        Key: Math.floor(Math.random() * 6000-0000-0000-000000),
    }).save().then(() => {
        message.channel.send('키가 만들어졌습니다. 몽고DB를 확인해보시기 바랍니다.')
    })
    return;
}

module.exports.help = {
    name: "프리미엄키만들기",
    aliases: [],
    devOnly: true
}