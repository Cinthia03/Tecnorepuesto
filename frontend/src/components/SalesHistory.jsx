import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_SALES = 'http://localhost:3000/api/sales'
const API_CLIENTS = 'http://localhost:3000/api/clients'

const money = v => Number(v || 0).toFixed(2)

export default function SalesHistory() {
  const { user } = useAuth()

  const [sales, setSales] = useState([])
  const [clients, setClients] = useState([])

  const [filterClient, setFilterClient] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const salesRes = await fetch(API_SALES)
      const salesData = await salesRes.json()

      const clientsRes = await fetch(API_CLIENTS)
      const clientsData = await clientsRes.json()

      setSales(salesData)
      setClients(clientsData)
    } catch (err) {
      console.error("Error cargando historial:", err)
    }
  }

  const filteredSales = sales.filter(s =>
    (!filterClient || s.clienteId == filterClient) &&
    (!filterDate || s.fecha === filterDate) &&
    (
      filterStatus === '' ||
      (filterStatus === 'activa' && !s.anulada) ||
      (filterStatus === 'anulada' && s.anulada)
    )
  )

  const getClientName = id => {
    const c = clients.find(x => x.id == id)
    return c ? c.username : '—'
  }

  const cancelSale = async id => {
    if (!window.confirm('¿Desea anular esta venta?')) return
    await fetch(`${API_SALES}/${id}/cancel`, { method: 'PUT' })
    loadData()
  }

  const printSale = sale => {
    const content = document.getElementById(`sale-${sale.id}`).innerHTML
    const win = window.open('', '', 'width=800,height=600')
    win.document.write(`
      <html>
        <head><title>Comprobante de Venta</title></head>
        <body>${content}</body>
      </html>
    `)
    win.document.close()
    win.print()
  }

  return (
    <>
      <h2>📊 Historial de Ventas</h2>

      {/* FILTROS */}
      <div style={formCard}>
        <h3>Filtros</h3>

        <div style={field}>
          <label>Cliente</label>
          <select style={input} value={filterClient} onChange={e => setFilterClient(e.target.value)}>
            <option value="">Todos</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.username}</option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label>Fecha</label>
          <input
            style={input}
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>

        <div style={field}>
          <label>Estado</label>
          <select style={input} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">Todas</option>
            <option value="activa">Ingresadas</option>
            <option value="anulada">Anuladas</option>
          </select>
        </div>
      </div>

      {/* SI NO HAY VENTAS */}
      {filteredSales.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: 20 }}>No hay ventas registradas</p>
      )}

      {/* LISTA DE VENTAS */}
      {filteredSales.map(sale => (
        <div key={sale.id} id={`sale-${sale.id}`} style={formCard}>
          <p><b>Fecha:</b> {sale.fecha}</p>
          <p><b>Cliente:</b> {getClientName(sale.clienteId)}</p>

          {/* corregido para evitar error si usuario no existe */}
          <p><b>Usuario:</b> {sale.usuario?.username || '—'}</p>

          <p><b>Método de pago:</b> {sale.pago}</p>

          <hr />

          {sale.items.map((i, idx) => (
            <p key={idx}>
              {i.nombre} x{i.cantidad} — ${money(i.subtotal)}
            </p>
          ))}

          <hr />

          <p><b>Subtotal:</b> ${money(sale.subtotal)}</p>
          <p><b>IVA:</b> ${money(sale.iva)}</p>
          <p style={{ fontSize: 18 }}><b>Total:</b> ${money(sale.total)}</p>

          {/* BOTÓN IMPRIMIR → TODOS LOS ROLES */}
          <button style={btnPrint} onClick={() => printSale(sale)}>
            🖨 Imprimir comprobante
          </button>

          {/* BOTÓN ANULAR → ADMIN / VENDEDOR / VENDEDOR ESPECIAL */}
          {!sale.anulada &&
            ['admin', 'vendedor', 'vendedor especial'].includes(user.rol) && (
              <button style={btnCancel} onClick={() => cancelSale(sale.id)}>
                ❌ Anular Venta
              </button>
            )}

          {sale.anulada && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>❌ VENTA ANULADA</p>
          )}
        </div>
      ))}
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

const btnCancel = {
  marginTop: 10,
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '10px',
  width: '100%',
  borderRadius: 8,
  cursor: 'pointer'
}

const btnPrint = {
  marginTop: 10,
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px',
  width: '100%',
  borderRadius: 8,
  cursor: 'pointer'
}
