const express = require("express");
const User = require("../models/user");
const router = express.Router()
const bcrypt = require('bcrypt')
router.post('/signup', async (req, res) => {

  let message = "User successfully registered"

  let useremail = await User.findOne({ email: req.body.email })
  let uname = await User.findOne({ username: req.body.username })
  let userphone = await User.findOne({ phone: req.body.phone })
  if (useremail) {
    message = "A user with same email already exists!"
    return res.json({ result: message,success: false })
  }
  else if (uname) {
    message = "The username already exists!"
    return res.json({ result: message,success: false })
  }
  else if (userphone) {
    message = "The phonenumber is used by a user!"
    return res.json({ result: message,success: false })
  }
  else {
    const salt = await bcrypt.genSalt(10)
    const encpass = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: encpass
    })
    return res.json({ result: message,success: true })
  }
})

module.exports = router