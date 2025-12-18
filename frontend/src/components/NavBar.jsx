import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const isAdmin = user.rol === 'admin'
  const isVendedor = user.rol === 'vendedor'
  const isVendedorEspecial = user.rol === 'vendedor_especial'

  return (
    <div style={nav}>
      <div style={menu}>

        <button style={btn} onClick={() => navigate('/dashboard')}>
          🏠 Dashboard
        </button>

        {(isAdmin) && (
          <button style={btn} onClick={() => navigate('/user')}>
            👥 Usuarios
          </button>
        )}

        {(isAdmin || isVendedor || isVendedorEspecial) && (
          <button style={btn} onClick={() => navigate('/sales')}>
            💰 Ventas
          </button>
        )}

        <button style={btn} onClick={() => navigate('/sales-history')}>
          📊 Historial de Ventas
        </button>

        {(isAdmin || isVendedorEspecial) && (
           <button style={btn} onClick={() => navigate('providers')}>
            🚚 Proveedores
          </button>
        )}

        {(isAdmin || isVendedorEspecial) && (
          <button style={btn} onClick={() => navigate('/purchases')}>
            🛒 Compras
          </button>
        )}

        {(isAdmin || isVendedorEspecial) && (
          <button style={btn} onClick={() => navigate('/purchase-history')}>
            📊 Historial de Compras
          </button>
        )}

        {(isAdmin || isVendedor || isVendedorEspecial) && (
          <button style={btn} onClick={() => navigate('/inventory')}>
            📦 Inventario
          </button>
        )}

    
      </div>

      <div style={footer}>
        <span style={userInfo}>
          {user.username} ({user.rol})
        </span>

        <button
          style={btnLogout}
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          🔒 Salir
        </button>
      </div>
    </div>
  )
}

/* =========================
   ESTILOS
========================= */

const nav = {
  width: 240,
  minHeight: '100vh',
  background: '#1e293b',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const menu = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}

const btn = {
  width: '100%',
  height: 42,
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 14,
  cursor: 'pointer',
  textAlign: 'left',
  paddingLeft: 12
}

const footer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10
}

const userInfo = {
  color: '#cbd5e1',
  fontSize: 13
}

const btnLogout = {
  background: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '8px',
  borderRadius: 8,
  cursor: 'pointer'
}
