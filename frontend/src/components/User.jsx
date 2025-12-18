import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:3000/api/auth/register'

export default function User() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
    rol: 'cliente',
    cedula: '',
    correo: '',
    telefono: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submit = async () => {
    if (!form.username || !form.password || !form.rol) {
      alert('⚠️ Complete los campos obligatorios')
      return
    }

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.message || '❌ Error al registrar usuario')
        return
      }

      alert('✅ Usuario registrado correctamente')
      navigate('/dashboard')
    } catch (error) {
      alert('❌ Error de conexión con el servidor')
    }
  }

  return (
    <div style={page}>
      <h2 style={title}>👤 Registro de Usuarios</h2>

      <div style={formCard}>
        <h3 style={subtitle}>Datos del Usuario</h3>

        <div style={field}>
          <label>Usuario *</label>
          <input
            style={input}
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Ingrese el usuario"
          />
        </div>

        <div style={field}>
          <label>Contraseña *</label>
          <input
            style={input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ingrese la contraseña"
          />
        </div>

        <div style={field}>
          <label>Rol *</label>
          <select
            style={input}
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="vendedor_especial">Vendedor Especial</option>
            <option value="vendedor">Vendedor</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div style={field}>
          <label>Cédula</label>
          <input
            style={input}
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ej: 0102030405"
          />
        </div>

        <div style={field}>
          <label>Correo</label>
          <input
            style={input}
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div style={field}>
          <label>Teléfono</label>
          <input
            style={input}
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="0999999999"
          />
        </div>

        <button style={btnSave} onClick={submit}>
          💾 Registrar Usuario
        </button>
      </div>
    </div>
  )
}

/* =========================
   ESTILOS
========================= */

const page = {
  padding: 30,
  background: '#f4f6f8',
  minHeight: '100vh'
}

const title = {
  fontSize: 24,
  marginBottom: 20
}

const subtitle = {
  marginBottom: 20
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
  padding: '0 5px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  fontSize: 14
}

const btnSave = {
  marginTop: 20,
  width: '100%',
  background: '#22c55e',
  color: 'white',
  border: 'none',
  padding: 14,
  borderRadius: 8,
  fontSize: 16,
  cursor: 'pointer'
}
