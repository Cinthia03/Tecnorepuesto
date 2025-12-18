// backend/controllers/sales.controller.js

const sales = require('../models/sale.model')
const clients = require('../models/client.model')
const users = require('../models/user.model')
const products = require('../models/product.model')

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

  for (let item of items) {
    const p = products.find(pr => pr.id == item.productId)

    if (!p) return res.status(404).json({ message: 'Producto no encontrado' })

    if (p.stock_actual < item.cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' })
    }

    subtotal += item.cantidad * p.precio_venta
  }

  items.forEach(item => {
    const p = products.find(pr => pr.id == item.productId)
    p.stock_actual -= item.cantidad
  })

  const iva = subtotal * 0.12
  const total = subtotal + iva

  const newSale = {
    id: sales.length + 1,
    fecha,
    clienteId,
    usuario: { id: usuario.id, username: usuario.username },
    pago,
    items,
    subtotal,
    iva,
    total,
    anulada: false
  }

  sales.push(newSale)

  res.json(newSale)
}


exports.cancelSale = (req, res) => {
  const { id } = req.params
  const sale = sales.find(s => s.id == id)

  if (!sale) return res.status(404).json({ message: 'Venta no encontrada' })
  if (sale.anulada) return res.status(400).json({ message: 'Ya está anulada' })

  sale.items.forEach(i => {
    const product = products.find(p => p.id === i.productId)
    if (product) product.stock_actual += i.cantidad
  })

  sale.anulada = true

  res.json(sale)
}
