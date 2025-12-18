// src/pages/Sales.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_PRODUCTS = 'http://localhost:3000/api/inventory/products'
const API_CLIENTS = 'http://localhost:3000/api/clients'
const API_SALES = 'http://localhost:3000/api/sales'

const money = v => Number(v || 0).toFixed(2)

export default function Sales() {
  const { user } = useAuth()

  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [cart, setCart] = useState([])

  const [productId, setProductId] = useState('')
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState('')

  const [clientId, setClientId] = useState('')
  const [payment, setPayment] = useState('Efectivo')
  const [date] = useState(new Date().toISOString().substring(0, 10))

  // =========================
  // CARGAR PRODUCTOS Y CLIENTES
  // =========================
  useEffect(() => {
    fetch(API_PRODUCTS)
      .then(r => r.json())
      .then(setProducts)

    fetch(API_CLIENTS)
      .then(r => r.json())
      .then(data => setClients(data.filter(u => u.rol === 'cliente')))
  }, [])

  // =========================
  // AGREGAR PRODUCTO (SIN IVA)
  // =========================
  const addProduct = () => {
    const p = products.find(x => x.id == productId)
    if (!p) return

    if (qty > p.stock_actual) {
      alert('❌ Stock insuficiente')
      return
    }

    const subtotalItem = qty * Number(p.precio_venta)

    setCart([
      ...cart,
      {
        productId: p.id,
        nombre: p.nombre,
        precio: Number(p.precio_venta), // sin IVA
        cantidad: qty,
        subtotal: subtotalItem
      }
    ])

    setProductId('')
    setQty(1)
    setPrice('')
  }

  // =========================
  // TOTALES (SIN DESCUENTOS)
  // =========================
  const subtotal = cart.reduce((s, i) => s + i.subtotal, 0)
  const iva = subtotal * 0.12
  const total = subtotal + iva

  // =========================
  // CONFIRMAR VENTA
  // =========================
  const confirmSale = async () => {
    if (!clientId || cart.length === 0) {
      alert('⚠ Seleccione cliente y productos')
      return
    }

    await fetch(API_SALES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: date,
        clienteId: Number(clientId),
        usuarioId: user.id,      // ✅ SOLO ID
        pago: payment,
        items: cart.map(i => ({
          productId: i.productId,
          cantidad: i.cantidad
        }))
      })
    })

    alert('✅ Venta registrada correctamente')
    setCart([])
  }


  // =========================
  // RENDER
  // =========================
  return (
    <>
      <h2>💰 Módulo de Ventas</h2>

      {/* DATOS DE LA VENTA */}
      <div style={formCard}>
        <h3>Datos de la Venta</h3>

        <div style={field}>
          <label>Fecha</label>
          <input style={input} type="date" value={date} disabled />
        </div>

        <div style={field}>
          <label>Cliente</label>
          <select
            style={input}
            value={clientId}
            onChange={e => setClientId(e.target.value)}
          >
            <option value="">Seleccione cliente</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>
                {c.username}
              </option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label>Método de pago</label>
          <select
            style={input}
            value={payment}
            onChange={e => setPayment(e.target.value)}
          >
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
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
              const prod = products.find(p => p.id == id)
              setPrice(prod ? prod.precio_venta : '')
            }}
          >
            <option value="">Seleccione producto</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.stock_actual})
              </option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label>Precio unitario (sin IVA)</label>
          <input style={input} value={price} disabled />
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
        <h3>Detalle de Venta</h3>

        {cart.map((i, idx) => (
          <p key={idx}>
            {i.nombre} x{i.cantidad} = ${money(i.subtotal)}
          </p>
        ))}

        <hr />

        <p><b>Subtotal:</b> ${money(subtotal)}</p>
        <p><b>IVA (12%):</b> ${money(iva)}</p>
        <p><b>Total:</b> ${money(total)}</p>

        <button onClick={confirmSale} style={btnSave}>
          ✅ Confirmar Venta
        </button>
      </div>

      <p style={{ marginTop: 20, color: '#64748b' }}>
        Usuario: {user.username} ({user.rol})
      </p>
    </>
  )
}

/* =========================
   ESTILOS
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
  background: '#08b146',
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
