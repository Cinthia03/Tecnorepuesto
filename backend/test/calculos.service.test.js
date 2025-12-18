const {
  calcularStock,
  calcularTotalCompra
} = require('../src/services/calculos.service');

describe('Pruebas unitarias - Servicios de cálculo', () => {

  test('Debe calcular correctamente el stock disponible', () => {
    const resultado = calcularStock(100, 50, 30);
    expect(resultado).toBe(120);
  });

  test('Debe calcular correctamente el total de una compra', () => {
    const compra = [
      { cantidad: 2, precio: 10 },
      { cantidad: 3, precio: 5 }
    ];
    const resultado = calcularTotalCompra(compra);
    expect(resultado).toBe(35);
  });

});


