const router = require('express').Router()

const controlerAddressDelivery = require('./controler-addres')

// midelware
const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/address', police_ceck('view', 'DeliveryAdress'), controlerAddressDelivery.getDeliveryAddress)
router.post('/address', police_ceck('create', 'DeliveryAdress'), controlerAddressDelivery.postDeliveryAddress)
router.put('/address/:id', controlerAddressDelivery.updateDeliveryAddress)
router.delete('/address/:id', controlerAddressDelivery.deleteDeliveryAddress)

module.exports = router


