const { MessageButton, MessageActionRow, Message } = require("discord.js");

/**
 * 
 * @param {Message} message 
 * @param {*} style 
 * @param {*} label 
 * @param {*} customid 
 */
function buttonCreateEvent(message, style, label, customid, collectedmessage, timeout) {
    if (!message) throw new TypeError('message to must be passed param!');
    if (!style) throw new TypeError('style to must be passed param!');
    if (!label) throw new TypeError('label to must be passed param!')
    if (!customid) throw new TypeError('customId to must be passed param!');
    if (!timeout) timeout = 60000;

    const button = new MessageActionRow().addComponents(
        new MessageButton().setStyle(style).setLabel(label).setCustomId(customid)
    );

    let filter = i => i.customId === `buttoncreate-${customid}` && i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async collected => {
        await collected.deferUpdate();
        if (collector.customId === `buttoncreate-${customid}`) {
            collector.stop();
            message.channel.send(collectedmessage)
        }
    })
}

module.exports = buttonCreateEvent;