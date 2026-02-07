const { test, expect, request } = require('@playwright/test');
const { getAdminToken } = require('../../../utils/apiAuthHelper');

test.describe('Admin Plant API', () => {

  let api;

  test.beforeEach(async () => {
    const token = await getAdminToken();
    api = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  });

  test('API-ADM-GET-11 | Get all plants (Admin)', async () => {
    const res = await api.get('/api/plants');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test.skip('API-ADM-GET-12 | Get empty plant list when no plants exist', async () => {
 
  });


  test('API-ADM-GET-13 | Get plant by valid ID', async () => {
    const res = await api.get('/api/plants/1'); 
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('price');
  });


  test('API-ADM-GET-14 | Get plant by invalid ID', async () => {
    const res = await api.get('/api/plants/99999');
    expect(res.status()).toBe(404);
  });


  test('API-ADM-GET-15 | Get plants by valid category ID', async () => {
    const categoryId = 1; 
    const res = await api.get(`/api/plants/category/${categoryId}`);

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

});