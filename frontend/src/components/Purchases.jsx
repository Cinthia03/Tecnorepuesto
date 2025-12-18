import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_PRODUCTS = 'http://localhost:3000/api/inventory/products'
const API_PROVIDERS = 'http://localhost:3000/api/providers'
const API_PURCHASES = 'http://localhost:3000/api/purchases'

const money = v => Number(v || 0).toFixed(2)

export default function Purchases() {
  const { user } = useAuth()

  const [products, setProducts] = useState([])
  const [providers, setProviders] = useState([])
  const [cart, setCart] = useState([])

  const [productId, setProductId] = useState('')
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState('')

  const [providerId, setProviderId] = useState('')
  const [date] = useState(new Date().toISOString().substring(0, 10))

  /* =========================
     CARGAR PRODUCTOS Y PROVEEDORES
     ========================= */
  useEffect(() => {
    fetch(API_PRODUCTS)
      .then(r => r.json())
      .then(setProducts)

    fetch(API_PROVIDERS)
      .then(r => r.json())
      .then(setProviders)
  }, [])

  /* =========================
     AGREGAR PRODUCTO
     ========================= */
  const addProduct = () => {
    const p = products.find(x => x.id == productId)
    if (!p) return

    if (qty <= 0 || price <= 0) {
      alert('⚠ Cantidad y precio inválidos')
      return
    }

    setCart([
      ...cart,
      {
        productId: p.id,
        nombre: p.nombre,
        cantidad: qty,
        precio: Number(price),
        subtotal: qty * Number(price)
      }
    ])

    setProductId('')
    setQty(1)
    setPrice('')
  }

  /* =========================
     TOTALES
     ========================= */
  const subtotal = cart.reduce((s, i) => s + i.subtotal, 0)
  const iva = subtotal * 0.12
  const total = subtotal + iva

  /* =========================
     CONFIRMAR COMPRA
     ========================= */
  const confirmPurchase = async () => {
    if (!providerId || cart.length === 0) {
      alert('⚠ Seleccione proveedor y productos')
      return
    }

    await fetch(API_PURCHASES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: date,
        proveedorId: providerId,
        usuario: user,
        items: cart,
        subtotal,
        iva,
        total
      })
    })

    alert('✅ Compra registrada y stock actualizado')
    setCart([])
  }

  /* =========================
     RENDER
     ========================= */
  return (
    <>
      <h2>🛒 Módulo de Compras</h2>

      {/* DATOS DE LA COMPRA */}
      <div style={formCard}>
        <h3>Datos de la Compra</h3>

        <div style={field}>
          <label>Fecha</label>
          <input style={input} type="date" value={date} disabled />
        </div>

        <div style={field}>
          <label>Proveedor</label>
          <select
            style={input}
            value={providerId}
            onChange={e => setProviderId(e.target.value)}
          >
            <option value="">Seleccione proveedor</option>
            {providers.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div style={formCard}>
        <h3>Agregar Producto</h3>

        <div style={field}>
          <label>Producto</label>
          <select
            style={input}
            value={productId}
            onChange={e => {
              const id = e.target.value
              setProductId(id)

              const selected = products.find(p => p.id == id)
              if (selected && selected.precio_costo) {
                setPrice(selected.precio_costo)
              } else {
                setPrice('')
              }
            }}
          >
            <option value="">Seleccione producto</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label>Precio compra</label>
          <input
            style={input}
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div style={field}>
          <label>Cantidad</label>
          <input
            style={input}
            type="number"
            min="1"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
          />
        </div>

        <button onClick={addProduct} style={btnAdd}>
          ➕ Agregar producto
        </button>
      </div>

      {/* DETALLE */}
      <div style={formCard}>
        <h3>Detalle de Compra</h3>

        {cart.map((i, idx) => (
          <p key={idx}>
            {i.nombre} x{i.cantidad} = ${money(i.subtotal)}
          </p>
        ))}

        <hr />

        <p><b>Subtotal:</b> ${money(subtotal)}</p>
        <p><b>IVA (12%):</b> ${money(iva)}</p>
        <p><b>Total:</b> ${money(total)}</p>

        <button onClick={confirmPurchase} style={btnSave}>
          ✅ Confirmar Compra
        </button>
      </div>

      <p style={{ marginTop: 20, color: '#64748b' }}>
        Usuario: {user.username} ({user.rol})
      </p>
    </>
  )
}

/* =========================
   ESTILOS (SIN CAMBIOS)
   ========================= */

const formCard = {
  background: '#ffffff',
  padding: 30,
  borderRadius: 12,
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  margin: '20px auto',
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
  background: '#0aac3bff',
  color: 'white',
  border: 'none',
  padding: '12px',
  width: '100%',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer'
}

const btnAdd = {
  background: '#0881b1ce',
  color: 'white',
  border: 'none',
  padding: '10px',
  width: '50%',
  borderRadius: 8,
  cursor: 'pointer',
  display: 'block',
  margin: '20px auto'
}
