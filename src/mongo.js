const mongoose = require("mongoose")
const { mongo } = require('./client')

module.exports = async () => {
    await mongoose.connect(mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })

    return mongoose
}

mongoose.connection.on("connected", () => {
    console.log('몽고DB 에 성공적으로 접속하였습니다.')
})