module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('이 명령어를 사용하려면 **채널 관리하기** 권한이 필요합니다.');
    if(args[0] == "0") return message.channel.send('슬로우모드를 0초로 설정할 수 없습니다. 삭제하시려면 뒤에 제거를 붙여주시기 바랍니다.');
    if(args[0] == "제거") {
        message.channel.setRateLimitPerUser("0");
        return message.channel.send('슬로우 모드를 제거하였습니다.')
    }

    if(isNaN (args[0])) return message.channel.send('숫자를 입력하세요. (초 단위)');

    message.channel.setRateLimitPerUser(args[0])
    message.reply(`슬로우모드를 ${args[0]}초로 설정했습니다.`);
}

module.exports.help = {
    name: "slow-mode",
    aliases: ["슬로우모드", "slowmode"],
    category: "관리자"
}