const { MessageActionRow, Message } = require("discord.js");

/**
 * 
 * @param {Message} message 
 * @param {*} pages 
 * @param {*} buttons 
 * @param {*} timeout 
 */
module.exports.createPages = async (message, pages, buttons, timeout) => {
    if (!message) throw new Error('message to must be passed param!');
    if (!pages) throw new Error('pages to must be passed param!')
    if (!buttons) throw new TypeError('buttons to must be passed param!')
    if (!timeout) timeout = 120000

    if (buttons[0].style === "LINK" || buttons[1].style === "LINK") throw new TypeError('buttons to not string!');
    if (buttons.length !== 2) throw new Error('No more than two buttons.');

    let page = 0;

    const row = new MessageActionRow().addComponents(buttons);

    const curPage = await message.edit({ embeds: [pages[page].setFooter(`페이지 ${page + 1} / ${pages.length}`)], components: [row] });

    const filter = i => i.customId === buttons[0].customId || i.customId === buttons[1].customId;

    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async i => {
        switch (i.customId) {
            case buttons[0].customId:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case buttons[1].customId:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
        }
        await i.deferUpdate();
        await i.edit({ embeds: [pages[page].setFooter(`페이지 ${page + 1} / ${pages.length}`)], components: [row] });
        collector.resetTimer();
    });

    collector.on("end", () => {
        if (!curPage.deleted) {
            const disabledRow = new MessageActionRow().addComponents(
                buttons[0].setDisabled(true),
                buttons[1].setDisabled(true)
            )
            curPage.edit({ embeds: [pages[page].setFooter(`페이지 ${page + 1} / ${pages.length}`)], components: [disabledRow] });
        }
    })

    return curPage;
}