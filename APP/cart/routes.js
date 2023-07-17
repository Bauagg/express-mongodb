const router = require('express').Router()

const controlerCart = require('./controler-cart')

// midelware
const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/cart', police_ceck('read', 'Cart'), controlerCart.getCart)
router.put('/cart', police_ceck('update', 'Cart'), controlerCart.putCart)

module.exports = router