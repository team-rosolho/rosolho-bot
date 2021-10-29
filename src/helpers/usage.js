module.exports.usage = function (message, command, prefix, text) {
    if (!message) throw new Error('message must be passed down as param!')
    if (!command) throw new Error('command name must be passed down as param!')
    if (!prefix) throw new Error('prefix must be passed down as param!')

    message.channel.send(`사용법: \n\`\`\`fix\n${prefix}${command} [${text}]\`\`\``)
}