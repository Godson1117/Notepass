const express = require('express')
const multer = require('multer')
const Note = require('../models/Note')
const loggeduser = require('../midlewares/loggeduser')
const router = express.Router()

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1]
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    },
});

const multerFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/
    let mimetype = filetypes.test(file.mimetype)
    if (mimetype)
        return cb(null, true)
    else
        cb('File format not supported', false)
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

router.get('/fetchnotes', loggeduser, async (req, res) => {

    try {
        const data = await Note.find({ userid: req.user.id }).select({ userid: 0 })
        res.json(data)
    }
    catch (e) {
        res.json({ message: "An error occured while fetching notes..." })
    }
})

router.post('/storenote', loggeduser, upload.single('myfile'), async (req, res) => {
    try {
        await Note.create({
            date: new Date().toDateString(),
            userid: req.user.id,
            title: req.body.title,
            description: req.body.description,
            attachement: req.filename == undefined ? '' : req.file.filename
        })
        res.json({ success: true, message: "Note succesfully stored" })
    }

    catch (e) {
        res.json({ success: false, message: "Internal Server Error...Note not stored" })
    }
})

router.put('/updatenote/:id', loggeduser, upload.single('myfile'), async (req, res) => {
    try {
        let updatedData = {}
        updatedData.title = req.body.title
        updatedData.description = req.body.description
        if(req.file != undefined)
            updatedData.attachement = req.file.filename
        updatedData.date = new Date().toDateString()
        await Note.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true })
        res.json(updatedData)
    }
    catch (e) {
        console.log(e)
        res.json({ message: "Internl server error...can't update" })
    }
})

router.delete('/deletenote/:id', loggeduser, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.json({ message: "Successfully deleted the note" })
    }
    catch (e) {
        res.json({ message: "Internal server error...can't delete the note" })
    }
})

module.exports = router