const router = require('express').Router()

const controlerCategory = require('./controler-categoru')

// midelware
const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/category', controlerCategory.getCategory)
router.post('/category', police_ceck('create', 'Category'), controlerCategory.postCategory)
router.put('/category/:id', police_ceck('update', 'Category'), controlerCategory.updateCategory)
router.delete('/category/:id', police_ceck('delete', 'Category'), controlerCategory.deleteCategoy)

module.exports = router