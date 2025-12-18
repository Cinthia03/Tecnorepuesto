import { useEffect, useState } from 'react'

const API = 'http://localhost:3000/api/inventory/products'

// Helpers
const num = v => Number(v) || 0
const money = v => (isNaN(Number(v)) ? '0.00' : Number(v).toFixed(2))

export default function Inventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    cost: '',
    price: '',
    stock: '',
    minStock: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [search])

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}?q=${search}`)
      setProducts(await res.json())
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm({
      code: '',
      name: '',
      description: '',
      category: '',
      cost: '',
      price: '',
      stock: '',
      minStock: ''
    })
    setEditingId(null)
  }

  const submit = async () => {
    if (!form.code || !form.name || !form.category) {
      alert('Complete los campos obligatorios')
      return
    }

    const product = {
      codigo: form.code.toUpperCase(),
      nombre: form.name,
      descripcion: form.description || '-',
      categoria: form.category,
      precio_costo: num(form.cost),
      precio_venta: num(form.price),
      stock_actual: num(form.stock),
      stock_minimo: num(form.minStock)
    }

    const url = editingId ? `${API}/${editingId}` : API
    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })

    loadProducts()
    resetForm()
  }

  const editProduct = p => {
    setEditingId(p.id)
    setForm({
      code: p.codigo,
      name: p.nombre,
      description: p.descripcion,
      category: p.categoria,
      cost: p.precio_costo,
      price: p.precio_venta,
      stock: p.stock_actual,
      minStock: p.stock_minimo
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteProduct = async id => {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    loadProducts()
  }

  return (
    <div style={page}>
      <h2>📦 Módulo de Inventario</h2>

      {/* FORMULARIO */}
      <div style={formCard}>
        <h3>{editingId ? '✏️ Editar Producto' : 'Registrar Producto'}</h3>

        <div style={field}>
          <label>Código *</label>
          <input name="code" style={input} value={form.code} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Nombre *</label>
          <input name="name"  style={input} value={form.name} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Descripción</label>
          <input name="description" style={input} value={form.description} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Categoría *</label>
          <select name="category" style={input} value={form.category} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option>Cables</option>
            <option>Accesorios</option>
            <option>Componentes</option>
          </select>
        </div>

        <div style={field}>
          <label>Precio Costo</label>
          <input style={input} type="number" name="cost" value={form.cost} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Precio Venta</label>
          <input style={input} type="number" name="price" value={form.price} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Stock Actual</label>
          <input style={input} type="number" name="stock" value={form.stock} onChange={handleChange} />
        </div>

        <div style={field}>
          <label>Stock Mínimo</label>
          <input type="number" style={input} name="minStock" value={form.minStock} onChange={handleChange} />
        </div>

        <button onClick={submit} style={btnSave}>
          💾 {editingId ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
      </div>

      {/* BUSCAR */}
      <input
        placeholder="🔍 Buscar por código o nombre"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ ...input, Width: '80%', height:20 , marginBottom: 10 }}
      />


      {/* LISTADO */}
      <h3 style={{ marginTop: 30 }}>Productos Registrados</h3>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={cards}>
          {products.map(p => (
            <div key={p.id} style={card}>
              <h4>{p.nombre}</h4>
              <p><b>Código:</b> {p.codigo}</p>
              <p><b>Categoría:</b> {p.categoria}</p>
              <p><b>Venta:</b> ${money(p.precio_venta)}</p>
              <p><b>Stock:</b> {p.stock_actual}</p>

              <div style={actions}>
                <button style={btnEdit} onClick={() => editProduct(p)}>✏ Editar</button>
                <button style={btnDelete} onClick={() => deleteProduct(p.id)}>🗑 Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================
   ESTILOS
========================= */

const page = {
  padding: 10,
  background: '#f4f6f8',
  minHeight: '100vh'
}

const formCard = {
  background: '#ffffff',
  padding: 30,
  borderRadius: 12,
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  margin: '20px auto',      // 👈 centra horizontalmente
  width: '80%'
}

const field = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 15
}

const input = {
  width: '100%',
  height: 40,
  padding: '0px 0px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  fontSize: 14
}

const btnSave = {
  marginTop: 20,
  background: '#22c55e',
  color: 'white',
  border: 'none',
  padding: 14,
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer'
}

const cards = {
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
  marginTop: 20
}

const card = {
  background: '#fff',
  padding: 20,
  borderRadius: 12,
  width: '40%',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
}

const actions = {
  display: 'flex',
  gap: 10,
  marginTop: 10
}

const btnEdit = {
  background: '#a18404ff',
  color: '#fff',
  border: 'none',
  padding: 6,
  borderRadius: 6,
  cursor: 'pointer'
}

const btnDelete = {
  background: '#dc2626',
  color: '#fff',
  border: 'none',
  padding: 6,
  borderRadius: 6,
  cursor: 'pointer'
}
