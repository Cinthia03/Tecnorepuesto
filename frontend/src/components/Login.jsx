import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) {
        alert('❌ Credenciales incorrectas')
        return
      }

      const data = await res.json()
      console.log('USUARIO LOGUEADO 👉', data)

      login(data)
      navigate('/dashboard')
    } catch (error) {
      alert('❌ Error de conexión con el servidor')
    }
  }

  return (
    <div style={page}>
      <form onSubmit={handleSubmit} style={card}>
        <h2 style={title}>🔐 Iniciar Sesión</h2>

        <div style={field}>
          <label>Usuario</label>
          <input
            style={input}
            placeholder="Ingrese su usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div style={field}>
          <label>Contraseña</label>
          <input
            style={input}
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={btnLogin}>
          🚀 Ingresar
        </button>

        <hr style={divider} />

        <p style={text}>
          ¿No tienes una cuenta?
        </p>

        <button
          type="button"
          style={btnRegister}
          onClick={() => navigate('/user')}
        >
          👤 Registrarse
        </button>
      </form>
    </div>
  )
}

/* =========================
   ESTILOS
========================= */

const page = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1e293b, #0f172a)'
}

const card = {
  background: '#ffffff',
  padding: 35,
  borderRadius: 14,
  width: 360,
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column'
}

const title = {
  textAlign: 'center',
  marginBottom: 25
}

const field = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom:10,
  width: '90%'
}

const input = {
  height: 42,
  padding: '0 12px',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  fontSize: 14
}

const btnLogin = {
  marginTop: 10,
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '12px',
  width: '100%',
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer'
}

const divider = {
  margin: '20px 0'
}

const text = {
  textAlign: 'center',
  marginBottom: 10,
  fontSize: 14
}

const btnRegister = {
  background: '#22c55e',
  color: '#fff',
  border: 'none',
  padding: '12px',
  width: '100%',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer'
}





