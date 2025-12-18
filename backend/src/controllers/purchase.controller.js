const purchases = require('../models/purchase.model')
const products = require('../models/product.model')

exports.createPurchase = (req, res) => {
  const {
    fecha,
    proveedorId,
    usuario,
    items,
    subtotal,
    iva,
    total
  } = req.body

  // 🔄 Actualizar stock y precio costo
  items.forEach(item => {
    const product = products.find(p => p.id === item.productId)
    if (product) {
      product.stock_actual += item.cantidad
      product.precio_costo = item.precio
    }
  })

  const purchase = {
    id: purchases.length + 1,
    fecha,
    proveedorId,
    usuario,
    items,
    subtotal,
    iva,
    total
  }

  purchases.push(purchase)

  res.status(201).json({
    message: 'Compra registrada y stock actualizado',
    purchase
  })
}

exports.getPurchases = (req, res) => {
  res.json(purchases)
}


