const express = require('express')
const router = express.Router()
const controller = require('../controllers/provider.controller')

router.get('/', controller.getProviders)
router.post('/', controller.createProvider)
router.put('/:id', controller.updateProvider)
router.delete('/:id', controller.deleteProvider)

module.exports = router
