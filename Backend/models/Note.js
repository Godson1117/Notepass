const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    date: String,
    userid: String,
    title: String,
    description: String,
    attachement: String
})

const Note = mongoose.model('notes', noteSchema)

module.exports = Note