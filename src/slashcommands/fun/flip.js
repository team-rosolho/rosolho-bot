module.exports.run = async (client, interaction) => {
    var flip = require('flip-text');

    let text = interaction.options.getString("텍스트");

    var txt = '';
    txt = text

    var textfliped = flip(text)
    interaction.reply({ content: textfliped })
}

module.exports.help = {
    name: "뒤집기"
}