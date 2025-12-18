const users = require('../models/user.model')

exports.login = (req, res) => {
  console.log('==========================')
  console.log('HEADERS 👉', req.headers)
  console.log('BODY 👉', req.body)
  console.log('==========================')

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: 'Datos incompletos'
    })
  }

  const user = users.find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    return res.status(401).json({
      message: 'Credenciales incorrectas'
    })
  }

  res.json(user)
}

// 🔥 REGISTRO
exports.register = (req, res) => {
  const { username, password, rol, cedula, correo, telefono } = req.body

  if (!username || !password || !rol) {
    return res.status(400).json({ message: 'Datos incompletos' })
  }

  const existe = users.find(u => u.username === username)
  if (existe) {
    return res.status(400).json({ message: 'Usuario ya existe' })
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    rol,
    cedula,
    correo,
    telefono
  }

  users.push(newUser)

  res.status(201).json(newUser)
}

