const schema = require('../../models/ProfileSchema');

module.exports.run = async ( client, message, args ) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send('이 명령어를 사용하려면 **서버 관리하기** 권한이 필요해요.');
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('멤버를 입력하세요.');

    let remwarn = args[1]
    if(!remwarn) remwarn = 1;

    let data;
    data = await schema.findOne({
        userId: member.id,
        guildId: message.guild.id
    })

    if(!data) return message.channel.send('데이터베이스에서 확인 결과: 해당 서버의 프로필이 등록된 유저 없음');
    if(data.warns === 0 || data.warns === null) return message.channel.send('해당 유저는 누적된 경고가 없습니다.');

    data.warns -= remwarn;
    await data.save();
    message.channel.send(`${message.author} 님에게서 ${remwarn}개의 경고를 삭제하였습니다. (삭제할 경고 수량 조정 가능)`);
}

module.exports.help = {
    name: "warn-remove",
    aliases: ["경고삭제"],
    category: "관리자"
}