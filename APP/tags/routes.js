const router = require('express').Router()

const controlerTags = require('./controler-tags')

// midelware
const { police_ceck } = require('../../midelware/midelware-otorisasi')

router.get('/tags', controlerTags.getTags)
router.post('/tags', police_ceck('create', 'Tag'), controlerTags.postTags)
router.put('/tags/:id', police_ceck('update', 'Tag'), controlerTags.updateTags)
router.delete('/tags/:id', police_ceck('delete', 'Tag'), controlerTags.deleteTags)

module.exports = router