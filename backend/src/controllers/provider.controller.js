const Provider = require('../models/provider.model')

exports.getProviders = (req, res) => {
  res.json(Provider.getAll())
}

exports.createProvider = (req, res) => {
  const provider = Provider.create(req.body)
  res.status(201).json(provider)
}

exports.updateProvider = (req, res) => {
  const updated = Provider.update(req.params.id, req.body)
  if (!updated) return res.status(404).json({ message: 'No encontrado' })
  res.json(updated)
}

exports.deleteProvider = (req, res) => {
  Provider.delete(req.params.id)
  res.json({ message: 'Eliminado' })
}
