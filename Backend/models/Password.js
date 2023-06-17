const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    date: String,
    userid: String,
    sitename: String,
    sitelink: String,
    password: String
})

const Password = mongoose.model('passwords', passwordSchema)

module.exports = Password