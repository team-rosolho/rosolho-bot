const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports.run = async (client, message) => {
    weather.find({ search: message.data.args.join(" "), degreeType: 'C' }, function (err, result) {
        if(err) return message.channel.send('오류가 발생하였습니다.');
        let 지역 = message.data.args.join(" ");
        if(!지역) return message.channel.send('지역을 입력해 주세요.');

        if(result.length === 0) return message.channel.send('알수없는 지역 입니다.');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`${current.observationpoint}의 날씨 정보 입니다`)
        .setThumbnail(current.imageUrl)
        .setColor('BLUE')
        .addField('시간 종류', `GMT-${location.timezone}`, true)
        .addField('온도 타입', '섭씨', true)
        .addField('온도', `${current.temperature}°`, true)
        .addField('풍향', current.winddisplay, true)
        .addField('체감 온도', `${current.feelslike}°`, true)
        .addField('습도', `${current.humidity}%`, true)
        message.channel.send({ embeds: [weatherinfo] })
    })
}

module.exports.help = {
    name: "weather",
    aliases: ["날씨"],
    category: "기본"
}