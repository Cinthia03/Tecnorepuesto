const express = require('express')
const router = express.Router()
const controller = require('../controllers/inventory.controller')

router.get('/products', controller.getProducts)
router.post('/products', controller.addProduct)
router.put('/products/:id', controller.updateProduct)
router.delete('/products/:id', controller.deleteProduct)

module.exports = router


