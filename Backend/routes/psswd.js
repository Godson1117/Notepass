const express = require('express')
const crypto = require('crypto-js')
const Password = require('../models/Password')
const loggeduser = require('../midlewares/loggeduser')
const router = express.Router()

const Securitykey = "A5PFmByLaZH3JNzOMo2zrDNQtXjKhQz8"

router.get('/getpasswords', loggeduser, async (req, res) => {

   const decdata = []
   try {
      const data = await Password.find({ userid: req.user.id }).select({ userid: 0 })
      data.forEach((item) => {
         let password = crypto.AES.decrypt(item.password, Securitykey).toString(crypto.enc.Utf8)
         decdata.push({ id: item._id, date: item.date, sitename: item.sitename, sitelink: item.sitelink, password: password })
      })
      res.json(decdata)
   }
   catch (e) {
      res.json({ message: "An error occured while fetching passwords..." })
   }
})

router.post('/storepassword', loggeduser, async (req, res) => {

   try {
      let encPass = crypto.AES.encrypt(req.body.password, Securitykey)
      const data = await Password.create({
         date: new Date().toDateString(),
         userid: req.user.id,
         sitelink: req.body.sitelink,
         sitename: req.body.sitename,
         password: encPass
      })
      res.json({ success: true, message: "Password succesfully stored" })
   }
   catch (e) {
      res.json({ success: false, message: "Internal Server Error...Password not stored" })
   }
})

router.put('/updatepassword/:id', loggeduser, async (req, res) => {
   try {
      const newPass = crypto.AES.encrypt(req.body.password, Securitykey)
      let updatedData = {}
      updatedData.sitename = req.body.sitename
      updatedData.sitelink = req.body.sitelink
      updatedData.date = new Date().toDateString()
      updatedData.password = newPass.toString()
      updatedData = await Password.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true })
      res.json(updatedData)
   }
   catch (e) {
      console.log(e)
      res.json({ message: "Internl server error...can't update" })
   }
})

router.delete('/deletepassword/:id', loggeduser, async(req,res)=>{
   try{
      await Password.findByIdAndDelete(req.params.id)
res.json({message:"Successfully deleted the password"})
   }
   catch(e){
      res.json({message:"Internalsrver error...can't delete the password"})
   }
})

module.exports = router