module.exports.run = async (client, message, args) => {
    const { Calculator } = require('weky');
    await Calculator({
        message: message,
        embed: {
            title: "계산기",
            color: "#00FFFF",
            timestamp: true,
            footer: "로쏠호봇",
        }
    })
}

module.exports.help = {
    name: "calculator",
    aliases: ["계산기", "calc"],
    category: "기본"
}