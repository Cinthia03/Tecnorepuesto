let products = require('../models/product.model')

/* =========================
   LISTAR / BUSCAR
========================= */
exports.getProducts = (req, res) => {
  const q = (req.query.q || '').toLowerCase()

  if (!q) {
    return res.json(products)
  }

  const filtered = products.filter(p =>
    p.codigo.toLowerCase().includes(q) ||
    p.nombre.toLowerCase().includes(q)
  )

  res.json(filtered)
}


/* =========================
   CREAR
========================= */
exports.addProduct = (req, res) => {
  const product = {
    id: Date.now(),
    ...req.body
  }
  products.push(product)
  res.status(201).json(product)
}

/* =========================
   EDITAR
========================= */
exports.updateProduct = (req, res) => {
  const id = Number(req.params.id)
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }

  products[index] = { ...products[index], ...req.body }
  res.json(products[index])
}

/* =========================
   ELIMINAR
========================= */
exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id)
  products = products.filter(p => p.id !== id)
  res.json({ message: 'Producto eliminado' })
}


