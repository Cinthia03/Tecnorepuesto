const express = require('express')
const router = express.Router()
const controller = require('../controllers/purchase.controller')

router.post('/', controller.createPurchase)
router.get('/', controller.getPurchases)

module.exports = router
