import { useEffect, useState } from 'react'

const API = 'http://localhost:3000/api/providers'

export default function Providers() {
  const [providers, setProviders] = useState([])
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    ruc: '',
    telefono: '',
    email: '',
    direccion: ''
  })

  /* =========================
     CARGAR PROVEEDORES
     ========================= */
  const loadProviders = async () => {
    const res = await fetch(API)
    const data = await res.json()
    setProviders(data)
  }

  useEffect(() => {
    loadProviders()
  }, [])

  /* =========================
     GUARDAR / ACTUALIZAR
     ========================= */
  const saveProvider = async () => {
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `${API}/${editId}` : API

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({
      nombre: '',
      ruc: '',
      telefono: '',
      email: '',
      direccion: ''
    })

    setEditId(null)
    loadProviders()
  }

  /* =========================
     ELIMINAR
     ========================= */
  const deleteProvider = async id => {
    if (!confirm('¿Eliminar proveedor?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    loadProviders()
  }

  /* =========================
     EDITAR
     ========================= */
  const editProvider = p => {
    setEditId(p.id)
    setForm({
      nombre: p.nombre,
      ruc: p.ruc,
      telefono: p.telefono,
      email: p.email,
      direccion: p.direccion
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* =========================
     FILTRO
     ========================= */
  const filtered = providers.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.ruc.includes(search)
  )

  return (
    <>
      <h2>🚚 Proveedores</h2>

      {/* =========================
         FORMULARIO
         ========================= */}
      <div style={formWrapper}>
        <div style={formCard}>
          <h3>{editId ? 'Editar Proveedor' : 'Registrar Proveedor'}</h3>

          <div style={field}>
            <label style={label}>Nombre</label>
            <input
              style={input}
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          <div style={field}>
            <label style={label}>RUC</label>
            <input
              style={input}
              value={form.ruc}
              onChange={e => setForm({ ...form, ruc: e.target.value })}
            />
          </div>

          <div style={field}>
            <label style={label}>Teléfono</label>
            <input
              style={input}
              value={form.telefono}
              onChange={e => setForm({ ...form, telefono: e.target.value })}
            />
          </div>

          <div style={field}>
            <label style={label}>Email</label>
            <input
              style={input}
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div style={field}>
            <label style={label}>Dirección</label>
            <input
              style={input}
              value={form.direccion}
              onChange={e => setForm({ ...form, direccion: e.target.value })}
            />
          </div>

          <button onClick={saveProvider} style={btnSave}>
            💾 {editId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* =========================
         BUSCADOR
         ========================= */}
      <input
        style={searchInput}
        placeholder="🔍 Buscar por nombre o RUC"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* =========================
         TARJETAS
         ========================= */}
      <div style={grid}>
        {filtered.map(p => (
          <div key={p.id} style={card}>
            <h4>{p.nombre}</h4>
            <p><b>RUC:</b> {p.ruc}</p>
            <p>📞 {p.telefono}</p>
            <p>✉ {p.email}</p>
            <p>📍 {p.direccion}</p>

            <button style={btnEdit} onClick={() => editProvider(p)}>
              ✏ Editar
            </button>

            <button style={btnDelete} onClick={() => deleteProvider(p.id)}>
              🗑 Eliminar
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

/* =========================
   ESTILOS
   ========================= */

const formWrapper = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20
}

const formCard = {
  width: '80%',
  background: '#fff',
  padding: 30,
  borderRadius: 14,
  margin: '20px auto', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}

const field = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column'
}

const label = {
  marginBottom: 10,
  fontWeight: '300',
  color: '#334155'
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
  background: '#16a34a',
  color: '#fff',
  padding: 14,
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  width: '100%',
  fontSize: 15
}

const searchInput = {
  display: 'block',
  margin: '25px auto',
  maxWidth: 300,
  padding: 10,
  borderRadius: 8,
  border: '1px solid #cbd5e1'
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 20,
  marginTop: 20
}

const card = {
  background: '#fff',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
}

const btnEdit = {
  background: '#a18404',
  color: '#fff',
  border: 'none',
  padding: 8,
  marginRight: 5,
  borderRadius: 6,
  cursor: 'pointer'
}

const btnDelete = {
  background: '#dc2626',
  color: '#fff',
  border: 'none',
  padding: 8,
  borderRadius: 6,
  cursor: 'pointer'
}
