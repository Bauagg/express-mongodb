const router = require('express').Router()

const controlerInvoice = require('./controler-invoice')

router.get('/invoice', controlerInvoice.getInvoice)

module.exports = router