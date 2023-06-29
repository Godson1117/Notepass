const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const verifyUser = require('../midlewares/verifyUser')

const accountSid = "AC36bda1a3f5bdaffb58f0642acf6acf14"
const authToken = "8b02892957b9d1f580c811adf1098d36"
const verifySid = "VA0d9380e10fe05e12ebc26a8397084a9c"
const client = require("twilio")(accountSid, authToken)

const country = '+91'
const JWT_KEY = "god@1117"

router.post('/otpverify', async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.body.phone })
        if (!user)
            res.json({ success: false, message: "No user Exists with this phone number" })
        else if (user && req.body.otp == '') {
            await client.verify.v2
                .services(verifySid)
                .verifications.create({ to: `${country}${req.body.phone}`, channel: "sms" })
            res.json({ success: true, message: "OTP send to the registered phone number" })
        }
        else {
            const result = await client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: `${country}${req.body.phone}`, code: req.body.otp })
            if (result.status == 'approved') {
                const data = {
                    cuser: {
                        id: user.id
                    }
                }
                const resettoken = jwt.sign(data, JWT_KEY)
                res.json({ success: true, message: "OTP verification Successfull", resettoken })
            }
            else
                res.json({ success: false, message: "Invalid OTP...!" })
        }
    }
    catch (e) {
        res.json({ success: false, message: "Internal Server Error" })
    }
})

router.post('/reset', (req, res, next) => {
    const resettoken = req.header('resettoken')
    const payload = jwt.verify(resettoken, JWT_KEY)
    req.user = payload.cuser
    next()
}, async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const encPass = await bcrypt.hash(req.body.password, salt)
        await User.findByIdAndUpdate(req.user.id, { $set: { password: encPass } }, { new: true })
        res.json({ success: true, message: "Password successfully resetted..." })
    }
    catch (e) {
        res.json({ success: false, message: "Internal Server Error..." })
    }
}
)

module.exports = router