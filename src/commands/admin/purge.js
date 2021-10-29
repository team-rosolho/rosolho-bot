module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('이 명령어를 사용하려면 **메시지 관리하기** 권한이 필요해요.');
    if(!args[0]) return message.channel.send(`청소할 수량을 입력하지 않았습니다.\n사용방법: ${module.exports.help.usage}`)
    let amount = parseInt(args[0]) || 1;
    message.channel.bulkDelete(amount + 1, true);
    message.channel.send(`${amount}개의 메시지를 삭제하였어요. (이 메시지는 곧 제거됩니다.)`).then(async msg => {
        setTimeout(() => {
            msg.delete();
        }, 10000)
    })
}

module.exports.help = {
    name: "purge",
    aliases: ["c", "ㅊ", "청소"],
    usage: "!!청소 <메시지 수량>",
    category: "관리자"
}