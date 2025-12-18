// Función para calcular stock disponible
function calcularStock(stockInicial, entradas, salidas) {
  return stockInicial + entradas - salidas;
}

// Función para calcular total de una compra
function calcularTotalCompra(detalleCompra) {
  return detalleCompra.reduce((total, item) => {
    return total + item.cantidad * item.precio;
  }, 0);
}

module.exports = {
  calcularStock,
  calcularTotalCompra
};

