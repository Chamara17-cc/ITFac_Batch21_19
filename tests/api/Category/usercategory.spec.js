const { test, expect } = require('@playwright/test');
const { initApi, closeApi, loginAndGetToken, get } = require('../../../utils/apiUtils');

let userToken;

test.describe('User Category APIs', () => {
  test.beforeAll(async () => {
    await initApi();
    userToken = await loginAndGetToken('testuser', 'test123');
    expect(userToken).toBeTruthy();
  });

  test.afterAll(async () => {
    await closeApi();
  });

  test('API-USER-CAT-GET-16 | Get category by valid ID', async () => {
    const res = await get('/api/categories/1', userToken);
    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
  });

  test('API-USER-CAT-GET-17 | Get category by invalid ID', async () => {
    const res = await get('/api/categories/9999', userToken);
    expect(res.status).toBe(404);
  });

  test('API-USER-CAT-GET-18 | Get all subcategories', async () => {
    const res = await get('/api/categories/sub-categories', userToken);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('API-USER-CAT-GET-19 | Access subcategories without authentication', async () => {
    const res = await get('/api/categories/sub-categories'); // no token
    expect(res.status).toBe(401);
  });

 test('API-USER-CAT-GET-20 | Get subcategories using parentId', async () => {
  const res = await get('/api/categories?parentId=1', userToken);

  // Status check
  expect(res.status).toBe(200);

  // Data type check
  expect(Array.isArray(res.data)).toBe(true);

  // Functional validation
  expect(res.data.length).toBeGreaterThan(0);
});



  
});
