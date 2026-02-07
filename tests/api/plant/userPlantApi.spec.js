const { test, expect, request } = require('@playwright/test');
const { getUserToken } = require('../../../utils/apiAuthHelper');

test.describe('User Plant API', () => {

  let api;

  test.beforeEach(async () => {
    const token = await getUserToken();
    api = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  });

  test('API-USER-GET-16 | Get all plants (User)', async () => {
    const res = await api.get('/api/plants');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });


  test('API-USER-GET-17 | Get plant by valid ID (User)', async () => {
    const validPlantId = 1; 

    const res = await api.get(`/api/plants/${validPlantId}`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('categoryId');
  });


  test('API-USER-GET-18 | Get plant by invalid ID', async () => {
    const res = await api.get('/api/plants/99999');
    expect(res.status()).toBe(404);
  });

  test('API-USER-GET-19 | Get plants by valid category ID', async () => {
    const validCategoryId = 1; 

    const res = await api.get(`/api/plants/category/${validCategoryId}`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('API-USER-GET-20 | Get plants by invalid category ID', async () => {
  const res = await api.get('/api/plants/category/99999');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBe(0);
});

});