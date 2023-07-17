const router = require('express').Router()
const passport = require('passport')
const localStrategi = require('passport-local').Strategy

const controlerUsers = require('./controler-user')

passport.use(new localStrategi({ usernameField: 'email' }, controlerUsers.localStrategi))

router.post('/register', controlerUsers.register)
router.post('/login', controlerUsers.login)
router.post('/logout', controlerUsers.logout)
router.get('/me', controlerUsers.me)

module.exports = router