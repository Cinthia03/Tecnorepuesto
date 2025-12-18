const express = require('express');
const cors = require('cors');

const inventoryRoutes = require('./src/routes/inventory.routes');
const purchaseRoutes = require('./src/routes/purchase.routes');
const salesRoutes = require('./src/routes/sales.routes');
const clientRoutes = require('./src/routes/client.routes');
const authRoutes = require('./src/routes/auth.routes');
const providerRoutes = require('./src/routes/provider.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);

module.exports = app; // ✅ EXPORTAR APP
