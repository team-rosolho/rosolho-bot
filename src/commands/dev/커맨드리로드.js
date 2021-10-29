module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send('카테고리 이름을 입력하세요.');
    if(!args[1]) return message.channel.send('커맨드 이름을 입력하세요.');

    let category = args[0].toLowerCase();
    let command = args[1].toLowerCase();

    try {
        delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
        client.commands.delete(command);
        const pull = require(`../../commands/${category}/${command}.js`);
        client.commands.set(command, pull);

        return message.channel.send(`Done reloading **${command}**!`);
    } catch (err) {
        return message.channel.send(`Error reloading **${command}**: **${err.message}**`)
    }
}

module.exports.help = {
    name: "커맨드리로드",
    aliases: [],
    devOnly: true
}