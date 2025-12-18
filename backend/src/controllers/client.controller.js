const users = require('../models/user.model')

exports.getClients = (req, res) => {
  const clients = users.filter(u => u.rol === 'cliente')
  res.json(clients)
}
