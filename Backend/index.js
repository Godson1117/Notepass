const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 8000
const URI = "mongodb+srv://godson:stormbreaker1117@cluster0.g1fnrdy.mongodb.net/Notepass?retryWrites=true&w=majority"

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
mongoose.connect(URI).then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Couldn't connect to database...network error..")
})


app.get('/', (req, res) => {
    res.send("Homepage of Notepass")
})

app.use('/auth', require('./routes/auth'))
app.use('/passwords', require('./routes/psswd'))
app.use('/notes', require('./routes/notes'))
app.use('/passwordreset',require('./routes/psswdReset'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})