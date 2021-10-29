module.exports.run = async (client, message, args) => {
    let data = (await client.money.findOne({
        UserId: message.author.id
    }));
    if(!data) return message.channel.send('통장을 생성하고 다시 시도해 주세요.\n통장생성방법: ``!!통장생성``');

    var e = AddCommna(data.Money);
    message.channel.send(`${e}원을 보유중이십니다.`)
}

module.exports.help = {
    name: "money",
    aliases: ["돈", "내돈", "ㄷ", "ㄴㄷ"]
}

function AddCommna(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}