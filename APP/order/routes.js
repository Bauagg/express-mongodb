const router = require('express').Router()

const controlerOrder = require('./controler-order')

const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/order', police_ceck('view', 'Order'), controlerOrder.getOrder)
router.post('/order', police_ceck('create', 'Order'), controlerOrder.postOrder)


module.exports = router