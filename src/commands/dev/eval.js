const { inspect } = require('util');
const { isValidURL } = require('../../utils/eval');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const isAsync = args.includes("--async");
    const isSilent = args.includes("--silent");
    const code = args.filter(e => !/^--(async|silent)$/.test(e)).join(" ");
    try {
        let result = eval(isAsync ? `(async()=>{${code}})()` : code);
        let isResultPromise = false;
        if (result instanceof Promise) {
            result = await result;
            isResultPromise = true;
        }
        if (isSilent) return;
        let inspectedResult = inspect(result, { depth: 0 });
        if (isResultPromise) inspectedResult = `Promise<${inspectedResult}>`;
        let embed = new MessageEmbed()
        .setTitle('eval')
        .setDescription(`Output\n${isValidURL(inspectedResult) ? inspectedResult : `\`\`\`js\n${inspectedResult}\`\`\``}`)
        message.channel.send({ embeds: [embed] })
    } catch (e) {
        message.channel.send(`\`\`\`js\n${e}\`\`\``);
    }
}

module.exports.help = {
    name: "eval",
    aliases: [],
    devOnly: true
}