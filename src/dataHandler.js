const { Client } = require('discord.js')

/**
 * 
 * @param {Client} client 
 */
async function createCmd(client) {
    const data = [
        {
            name: "앵무새",
            description: "입력한 내용을 따라합니다.",
            options: [
                {
                    name: "텍스트",
                    description: "따라할 항목을 입력하세요.",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "날씨",
            description: "해당 지역의 날씨를 표시합니다.",
            options: [
                {
                    name: "지역",
                    description: "지역을 입력하세요.",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "뒤집기",
            description: "글자를 뒤집습니다.",
            options: [{
                name: "텍스트",
                description: "뒤집을 글자를 입력하세요.",
                type: "STRING",
                required: true
            }]
        }
    ]

    await client.application?.commands.set(data);
}

module.exports = { createCmd }