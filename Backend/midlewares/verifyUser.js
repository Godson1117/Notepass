const jwt = require('jsonwebtoken')
const JWT_KEY = "god@1117"

const verifyUser = (req, res, next) => {
    const authtoken = req.header('authtoken')
    const payload = jwt.verify(authtoken, JWT_KEY)
    req.user = payload.cuser
    next()
}

module.exports = verifyUser