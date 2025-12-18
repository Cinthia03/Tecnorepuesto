/*const express = require('express');
const router = express.Router();
const controller = require('../controllers/client.controller');


router.get('/orders', controller.getClientOrders);


module.exports = router;*/

const express = require('express')
const router = express.Router()
const controller = require('../controllers/client.controller')

// ✅ LISTAR CLIENTES
router.get('/', controller.getClients)

module.exports = router
