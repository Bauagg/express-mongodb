const router = require('express').Router()

const controlerProduct = require('./controler_product')

const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/product', controlerProduct.getProduct)
router.get('/product/:id', controlerProduct.getProductById)
router.post('/product', police_ceck('create', 'Product'), controlerProduct.createProduct)
router.put('/product/:id', police_ceck('update', 'Product'), controlerProduct.updateProduct)
router.delete('/product/:id', police_ceck('delete', 'Product'), controlerProduct.deleteProduct)

module.exports = router