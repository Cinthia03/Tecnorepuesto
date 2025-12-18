const express = require('express')
const router = express.Router()
const controller = require('../controllers/sales.controller')

// CREAR VENTA
router.post('/', controller.createSale)

// HISTORIAL
router.get('/', controller.getSales)

// ❌ ANULAR VENTA
router.put('/:id/cancel', controller.cancelSale)

module.exports = router

