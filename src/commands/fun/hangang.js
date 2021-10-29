module.exports.run = async (client, message, args) => {
    const fetch = await client.fetch('http://hangang.dkserver.wo.tc').then(res => res.json());

    message.channel.send(`한강 온도: ${fetch.temp}\n시간: ${fetch.time}`);
}

module.exports.help = {
    name: "hangang",
    aliases: ["한강온도", "한강기온", "한강"],
    category: "기본"
}