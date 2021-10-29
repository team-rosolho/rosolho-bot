module.exports = {
    help: {
        name: "nitro",
        aliases: ['니트로'],
        description: "정말 극소수의 확률로 니트로를 뽑아냅니다.",
        usage: "!!니트로"
    },
    run: async (client, message, args) => {
        const nitro = require('discordnitro');

        var code = nitro(3)
        message.author.send(`${code}`);
    }
}