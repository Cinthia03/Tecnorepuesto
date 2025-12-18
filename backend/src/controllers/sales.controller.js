const sales = require('../models/sale.model')
const users = require('../models/user.model')
const products = require('../models/product.model')

// ============================
// CREAR VENTA
// ============================
exports.createSale = (req, res) => {
  const { fecha, clienteId, usuarioId, pago, items } = req.body

  if (!usuarioId) {
    return res.status(400).json({ message: 'Usuario no identificado' })
  }

  const usuario = users.find(u => u.id == usuarioId)
  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }

  let subtotal = 0

  // ✅ ITEMS ENRIQUECIDOS
  const detailedItems = items.map(item => {
    const product = products.find(p => p.id == item.productId)

    if (!product) {
      return null
    }

    if (product.stock_actual < item.cantidad) {
      throw new Error('Stock insuficiente')
    }

    const itemSubtotal = item.cantidad * product.precio_venta
    subtotal += itemSubtotal

    return {
      productId: product.id,
      nombre: product.nombre,
      precio: product.precio_venta,
      cantidad: item.cantidad,
      subtotal: itemSubtotal
    }
  }).filter(Boolean)

  // Descontar stock
  detailedItems.forEach(item => {
    const product = products.find(p => p.id == item.productId)
    product.stock_actual -= item.cantidad
  })

  const iva = subtotal * 0.12
  const total = subtotal + iva

  const newSale = {
    id: sales.length + 1,
    fecha,
    clienteId: Number(clienteId),
    usuario: {
      id: usuario.id,
      username: usuario.username
    },
    pago,
    items: detailedItems, // ✅ GUARDADO CORRECTO
    subtotal,
    iva,
    total,
    anulada: false
  }

  sales.push(newSale)
  res.status(201).json(newSale)
}


// ============================
// LISTAR VENTAS
// ============================
exports.getSales = (req, res) => {
  res.json(sales)
}

// ============================
// ANULAR VENTA
// ============================
exports.cancelSale = (req, res) => {
  const { id } = req.params

  const sale = sales.find(s => s.id == id)

  if (!sale) {
    return res.status(404).json({ message: 'Venta no encontrada' })
  }

  if (sale.anulada) {
    return res.status(400).json({ message: 'La venta ya fue anulada' })
  }

  // Restaurar stock
  sale.items.forEach(item => {
    const product = products.find(p => p.id == item.productId)
    if (product) {
      product.stock_actual += item.cantidad
    }
  })

  sale.anulada = true

  res.json(sale)
}
