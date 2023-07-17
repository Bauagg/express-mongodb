const jwt = require('jsonwebtoken')

const config = require('../APP/config')
const User = require('../APP/users/models-user')

const { getToken } = require('../utils/token')

const decodeToken = () => {
    return async (req, res, next) => {
        try {
            const token = getToken(req)

            if (!token) return next()

            req.user = jwt.verify(token, config.secretkey)

            const newUsers = await User.findOne({ token: { $in: [token] } })
            if (!newUsers) {
                return res.status(403).json({
                    error: true,
                    message: 'token expired'
                })
            }
        } catch (err) {
            if (err && err.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: err.message
                })
            }
            next(err)
        }
        return next()
    }
}

module.exports = {
    decodeToken
}