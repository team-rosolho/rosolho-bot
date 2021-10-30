const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports.run = async (client, message, args) => {
    var momentDate = moment(new Date());
    var unixDate = momentDate.unix();
    message.channel.send('현재 시간: <t:' + JSON.stringify(unixDate) + '>')
}

module.exports.help = {
    name: "time",
    aliases: ["시간", "시계", "타임", "stamp", "스템프", "스탬프", "now"]
}