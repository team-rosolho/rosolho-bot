const axios = require('axios');
const { CanvasRenderService } = require('chartjs-node-canvas');
const { MessageAttachment } = require('discord.js');

const width = 800;
const height = 600;

const chartCallback = (ChartJS) => {
    ChartJS.plugins.register({
        beforeDraw: (chartInstance) => {
            const { chart } = chartInstance
            const { ctx } = chart
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, chart.width, chart.hegiet)
        }
    })
}

module.exports.run = async (client, message, args) => {
    const days = parseInt(args) || 30

    const url = 'https://api.covidtracking.com/v1/us/daily.json'
    let { data: results } = await axios.get(url)
    results = results.slice(0, days).reverse()

    const labels = []
    const deaths = []
    const cases = []
    const recovered = []

    for (const result of results) {
        let date = String(result.date)
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const day = date.substring(6, 8)
        labels.push(`${day}/${month}/${year}`)

        deaths.push(result.death)
        cases.push(result.positive)
        recovered.push(result.recovered)
    }

    const canvas = new CanvasRenderService(width, height, chartCallback)

    const configuration = {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: '확진',
                    data: cases,
                    color: '#7289d9',
                    borderColor: '#7289d9',
                    backgroundColor: '#7289d9', 
                    fill: false
                },
                {
                    label: '사망',
                    data: deaths,
                    color: '#b32f38',
                    backgroundColor: '#b32f38',
                    borderColor: '#b32f38',
                    fill: false,
                },
                {
                    label: '완치',
                    data: recovered,
                    color: '#592ec2',
                    backgroundColor: '#592ec2',
                    borderColor: '#592ec2',
                    fill: false,
                }
            ]
        }
    }

    const image = await canvas.renderToBuffer(configuration)

    const attachment = new MessageAttachment(image)

    message.channel.send({ files: [attachment] })
    message.channel.send({ content: "+ 코로나 예방하는법", files: [new MessageAttachment('https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDAzMjVfMjAz%2FMDAxNTg1MTE3ODc4NjU4.CiCfYFA27dq-SW_-xaFGukBcAIJotDTRG9qbeZ6uv3sg.Q0o2Igle_VbHhGGBVq_JFjlCmejL4hJ4i0NePtqbAPcg.JPEG%2FILJ72V4spFEfhTPj-XcbQyCUzJGs.jpg&type=sc960_832', '코로나예방수칙.jpg')] })
}

module.exports.help = {
    name: "covid",
    aliases: ["코로나", "코비드", "위드코로나"]
}