const weather = require('weather-js');
const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} inter 
 */
module.exports.run = async (client, inter) => {
    weather.find({ search: inter.options.getString("지역"), degreeType: 'C' }, function (err, result) {
        if(err) return inter.reply({ content: "지역의 날씨를 확인하는동안 오류가 발생하였습니다.", ephemeral: true });

        if(result.length === 0) return inter.reply({ content: "알 수 없는 지역입니다.", ephemeral: true });

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
        inter.reply({ embeds: [weatherinfo] })
    })
}

module.exports.help = {
    name: "날씨"
}