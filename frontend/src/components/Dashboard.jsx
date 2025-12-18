/*import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <h2>No autorizado</h2>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido {user.username}</p>
      <p>Rol: {user.rol}</p>
    </div>
  )
}*/

import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <h2 style={noAuth}>No autorizado</h2>
  }

  return (
    <div style={container}>
      <h1 style={title}>📊 Dashboard</h1>

      <div style={card}>
        <h2 style={welcome}>Bienvenido, {user.username}</h2>
        <p style={role}>
          Rol actual: <strong>{user.rol.toUpperCase()}</strong>
        </p>
      </div>

      <div style={grid}>
        <div style={box}>
          <h3>🛒 Ventas</h3>
          <p>Gestión y registro de ventas</p>
        </div>

        {(user.rol === 'admin' || user.rol === 'vendedor') && (
          <div style={box}>
            <h3>📦 Inventario</h3>
            <p>Control de productos y stock</p>
          </div>
        )}

        {user.rol === 'admin' && (
          <div style={box}>
            <h3>🧾 Compras</h3>
            <p>Registro de compras a proveedores</p>
          </div>
        )}

        <div style={box}>
          <h3>📈 Historial</h3>
          <p>Consulta de ventas realizadas</p>
        </div>
      </div>
    </div>
  )
}

/* =========================
   ESTILOS DASHBOARD
========================= */

const container = {
  padding: 30,
  flex: 1,
  background: '#f8fafc',
  minHeight: '100vh'
}

const title = {
  fontSize: 28,
  marginBottom: 20,
  color: '#1e293b'
}

const card = {
  background: 'white',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  marginBottom: 30
}

const welcome = {
  margin: 0,
  fontSize: 22,
  color: '#0f172a'
}

const role = {
  marginTop: 8,
  color: '#475569'
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 20
}

const box = {
  background: 'white',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
  cursor: 'pointer',
  transition: 'transform 0.2s'
}

const noAuth = {
  padding: 40,
  textAlign: 'center',
  color: '#ef4444'
}


