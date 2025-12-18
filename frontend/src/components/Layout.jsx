import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavBar from './NavBar'

export default function Layout() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }

  /*return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}*/

return (
    <div style={layout}>
      <NavBar />
      <main style={content}>
        <Outlet />
      </main>
    </div>
  )
}

/* =========================
   ESTILOS
========================= */

const layout = {
  display: 'flex',
  minHeight: '100vh',
  background: '#f4f6f8'
}

const content = {
  flex: 1,
  padding: 30,
  overflowY: 'auto'
}
