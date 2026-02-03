const { test, expect } = require('@playwright/test');
const { initApi, closeApi, loginAndGetToken, get } =require('../../../utils/apiUtils');

let adminToken;

test.beforeAll(async () => {
  await initApi();
  adminToken = await loginAndGetToken('admin', 'admin123');
  expect(adminToken).not.toBeNull();
});

test.afterAll(async () => {
  await closeApi();
});

test('API-ADMIN-CAT-GET-11 | Get category by valid ID', async () => {
  const res = await get('/api/categories/1', adminToken);

  // Check status
  expect(res.status).toBe(200);

  // Check data
  expect(res.data).toHaveProperty('id', 1);
});



 test('API-ADMIN-CAT-GET-12 | Get category by invalid ID', async () => {
  // Use the exact URL for non-existent category
  const res = await get('/api/categories/100', adminToken);
  console.log('Response:', res); // Debug output

  // Assertions
  expect(res.status).toBe(404);
  expect(res.data).toHaveProperty('message'); 
  expect(res.data.message).toContain('Category not found');
});


   test('API-ADMIN-CAT-GET-13 | Combined filters (name + parentId)', async () => {
    const res = await get('/api/categories?name=Flower&parentId=1', adminToken);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    res.data.forEach(cat => {
      expect(cat.name).toContain('Flower');
      expect(cat.parentId).toBe(1);
    });
  });

  test('API-ADMIN-CAT-GET-14 | Get all subcategories', async () => {
    const res = await get('/api/categories/sub-categories', adminToken);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('API-ADMIN-CAT-GET-15 | Unauthorized access attempt', async () => {
    const res = await get('/api/categories/1'); // no token
    expect(res.status).toBe(401);
  });