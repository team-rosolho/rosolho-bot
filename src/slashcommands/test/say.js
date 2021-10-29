module.exports.run = async (client, inter) => {
    const text = inter.options.getString("텍스트");
    return await inter.reply({ content: text })
}

module.exports.help = {
    name: "앵무새"
}