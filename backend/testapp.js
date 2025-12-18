const express = require('express');
const cors = require('cors');

const inventoryRoutes = require('./src/routes/inventory.routes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SOLO INVENTARIO (evita errores de otros módulos)
app.use('/api/inventory', inventoryRoutes);

module.exports = app;
