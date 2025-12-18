const request = require('supertest');
const app = require('../testapp'); // 👈 CLAVE

describe('Prueba de integración - Inventario', () => {

  test('Debe listar productos', async () => {
    const res = await request(app).get('/api/inventory/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Debe crear un producto', async () => {
    const res = await request(app)
      .post('/api/inventory/products')
      .send({
        id: 2,
        name: 'Mouse',
        stock: 15,
        price: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Mouse');
  });

});


