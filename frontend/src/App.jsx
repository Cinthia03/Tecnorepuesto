import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import User from './components/User'
import Inventory from './components/Inventory'
import Sales from './components/Sales'
import Purchases from './components/Purchases'
import Providers from './components/Providers'
import PurchaseHistory from './components/PurchaseHistory'
import SalesHistory from './components/SalesHistory'
import Layout from './components/Layout'

import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/user" element={<User />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/sales-history" element={<SalesHistory />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


