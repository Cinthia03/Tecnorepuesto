
const API = 'http://localhost:3000/api'

// INVENTARIO
export const getProducts = async () => {
  const res = await fetch(`${API}/inventory/products`)
  return res.json()
}

// VENTAS
export const createSale = async (data) => {
  const res = await fetch(`${API}/sales`)
  return res.json()
}

// COMPRAS
export const createPurchase = async (data) => {
  const res = await fetch(`${API}/purchases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
