const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/User")

router.post('/signup', async (req, res) => {

  let message = "User successfully registered"
  let success = true
  try {
    const useremail = await User.findOne({ email: req.body.email })
    const uname = await User.findOne({ username: req.body.username })
    const userphone = await User.findOne({ phone: req.body.phone })
    if (useremail) {
      success = false
      message = "A user with same email already exists!"
    }
    else if (uname) {
      success = false
      message = "The username already exists!"
    }
    else if (userphone) {
      success = false
      message = "The phonenumber is used by a user!"
    }
    else {
      const salt = await bcrypt.genSalt(10)
      const encPass = await bcrypt.hash(req.body.password, salt)
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: encPass
      })
    }
    return res.json({ success, message })
  }
  catch (e) {
    success = false
    message = "Internal Server error"
    return res.status(500).json({ success, message })
  }
})

router.post('/login', async (req, res) => {
  const JWT_KEY = "god@1117"
  let authtoken = ""
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const orgPass = await bcrypt.compare(req.body.password, user.password)
      if (orgPass) {
        success = true
        message = "Logged in successfully"
        const data = {
          cuser: {
            id: user.id
          }
        }
        authtoken = jwt.sign(data, JWT_KEY)
      }
      else {
        success = false
        message = "Invalid Password...Try again!"
      }
    }
    else {
      success = false
      message = "Invalid email...Are you registered?"
    }
    return res.json({ success, message, authtoken })
  }
  catch (e) {
    success = false
    message = "Internal Server error"
    return res.status(500).json({ success, message, authtoken })
  }
})

module.exports = router