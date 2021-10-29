const schema = require('../../models/ProfileSchema');

module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send('이 명령어를 사용하려면 **서버 관리하기** 권한이 필요해요.');

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('멤버를 입력하세요.')

    let reason = args.slice(3).join(" ");
    if(!reason) reason = "No Reason Give.";

    let warn = args[1];
    if(!warn) warn = 1;

    if(member.id === message.guild.ownerId) return message.channel.send('서버 소유자한테 경고할 수 없습니다.')
    if(member.id === '813634627800530984') return message.channel.send('로쏠호에게 경고할 수 없습니다.');

    let data;
    data = await schema.findOne({
        userId: member.id,
        guildId: message.guild.id
    })
    if(!data) {
        data = await schema.create({
            userId: member.id,
            guildId: message.guild.id
        })
    }

    if(data.warns > 6) {
        member.ban({ reason: "최대경고 돌파" });
        member.send(`당신은 ${message.guild.name} 길드에서 차단 당했습니다.\n이유: 경고 5회 이상 누적`);
        return message.channel.send(`${member.user} 님은 경고 5회가 누적되었으므로 차단 당합니다.`);
    }

    data.warns += warn;
    await data.save();
    
    message.channel.send(`${member.user} 님에게 경고 ${warn}회를 지급하였습니다. (경고수량 조절 가능)\n횟수: ${data.warns}/5`);
    member.send(`당신은 ${message.guild.name} 에서 경고먹었습니다.\n이유: ${reason}`);
}

module.exports.help = {
    name: "warn",
    aliases: ["경고"],
    category: "관리자"
}