const User = require('./models-user')
const validateBcrypt = require('../../utils/bcrypt')
const { getToken } = require('../../utils/token')
const config = require('../config')

const bcrypt = require('bcrypt')
const pasport = require('passport')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const { full_name, email, password, role } = req.body

        const isEmailRegister = await User.exists({ email })
        if (isEmailRegister) {
            return res.status(401).json({ error: 'email sudah terdaftar' })
        }

        const newUsers = await User.create({
            full_name,
            email,
            password: await validateBcrypt.hashPassword(password),
            role
        })

        return res.status(201).json({
            error: false,
            message: 'register succesfully',
            datas: newUsers
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const localStrategi = async (email, password, done) => {
    try {
        const newUsers = await User.findOne({ email }).select('-__v -createdAt -updateAt -cart_items -token')

        if (!newUsers) return done()

        if (bcrypt.compareSync(password, newUsers.password)) {
            const { password, ...userWithoutPassword } = newUsers.toJSON()
            return done(null, userWithoutPassword)
        }
    } catch (err) {
        done(err)
    }
    done()
}

const login = async (req, res, next) => {
    pasport.authenticate('local', async function (err, user) {
        if (err) return next(err)

        if (!user) return res.status(400).json({
            error: true,
            message: 'Email or Password  incorect'
        })

        const signed = jwt.sign(user, config.secretkey)

        await User.findByIdAndUpdate(user._id, { $push: { token: signed } })

        res.status(200).json({
            message: ' login succesfully',
            user,
            token: signed
        })
    })(req, res, next)
}

const logout = async (req, res, next) => {
    try {
        const token = getToken(req)

        const newUsers = await User.findOneAndUpdate(
            { token: { $in: [token] } },
            { $pull: { token: token } },
            { useFinAndModify: false }
        )

        if (!token || !newUsers) {
            return res.status(404).json({
                error: false,
                message: 'no user found '
            })
        }

        return res.status(200).json({
            error: true,
            message: 'logout succesfully'
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

// untuk testing user
const me = (req, res, next) => {
    if (!req.user) {
        return res.json({
            error: 1,
            message: `you're not login or token expired`
        })
    }
    return res.json(req.user)
}

module.exports = {
    register,
    localStrategi,
    login,
    logout,
    me
}