import { useEffect, useState } from 'react'

const API_PURCHASES = 'http://localhost:3000/api/purchases'
const API_PROVIDERS = 'http://localhost:3000/api/providers'

const money = v => Number(v || 0).toFixed(2)

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([])
  const [providers, setProviders] = useState([])

  useEffect(() => {
    fetch(API_PURCHASES)
      .then(r => r.json())
      .then(setPurchases)

    fetch(API_PROVIDERS)
      .then(r => r.json())
      .then(setProviders)
  }, [])

  const getProviderName = id => {
    const p = providers.find(x => x.id == id)
    return p ? p.nombre : '—'
  }

  return (
    <>
      <h2>📦 Historial de Compras</h2>

      {purchases.map(p => (
        <div key={p.id} style={formCard}>
          <p><b>Fecha:</b> {p.fecha}</p>
          <p><b>Proveedor:</b> {getProviderName(p.proveedorId)}</p>
          <p><b>Usuario:</b> {p.usuario.username} ({p.usuario.rol})</p>

          <hr />

          {p.items.map((i, idx) => (
            <p key={idx}>
              {i.nombre} x{i.cantidad} — ${money(i.subtotal)}
            </p>
          ))}

          <hr />

          <p><b>Subtotal:</b> ${money(p.subtotal)}</p>
          <p><b>IVA:</b> ${money(p.iva)}</p>
          <p style={{ fontSize: 18 }}>
            <b>Total:</b> ${money(p.total)}
          </p>
        </div>
      ))}

      {purchases.length === 0 && (
        <p>No hay compras registradas</p>
      )}
    </>
  )
}

/* =========================
   ESTILOS (MISMO DISEÑO)
   ========================= */

const formCard = {
  background: '#ffffff',
  padding: 30,
  borderRadius: 12,
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  margin: '20px auto',      // 👈 centra horizontalmente
  width: '80%'
}
