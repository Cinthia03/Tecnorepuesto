const express = require('express')
const router = express.Router()
const controller = require('../controllers/sales.controller')

// Crear venta
router.post('/', controller.createSale)

// Listar ventas
router.get('/', controller.getSales)

// Anular venta
router.put('/:id/cancel', controller.cancelSale)

module.exports = router
