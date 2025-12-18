// DATOS EN MEMORIA
let providers = [
  {
    id: 1,
    nombre: 'Distribuidora Andina',
    ruc: '1790012345001',
    telefono: '0991234567',
    email: 'ventas@andina.com',
    direccion: 'Quito'
  },
  {
    id: 2,
    nombre: 'Proveedor El Ahorro',
    ruc: '1790098765001',
    telefono: '0987654321',
    email: 'contacto@ahorro.com',
    direccion: 'Guayaquil'
  }
]

let nextId = 3

module.exports = {
  getAll() {
    return providers
  },

  create(data) {
    const provider = { id: nextId++, ...data }
    providers.push(provider)
    return provider
  },

  update(id, data) {
    const index = providers.findIndex(p => p.id == id)
    if (index === -1) return null
    providers[index] = { ...providers[index], ...data }
    return providers[index]
  },

  delete(id) {
    providers = providers.filter(p => p.id != id)
  }
}
