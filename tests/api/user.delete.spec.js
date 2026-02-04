const { test, expect } = require('@playwright/test');
const {
  initApi,
  closeApi,
  loginAndGetToken,
  get,
  del,
} = require('../../utils/apiUtils');

test.describe('User Category DELETE API', () => {

  test.beforeAll(async () => {
    await initApi();
  });

  test.afterAll(async () => {
    await closeApi();
  });

  test('API-USER-CAT-01: Verify User cannot delete category via API', async () => {
    const userToken = await loginAndGetToken('testuser', 'test123');
    expect(userToken).toBeTruthy();

    const getResponse = await get('/api/categories', userToken);
    expect(getResponse.status).toBe(200);

    const categories = getResponse.data;
    expect(categories.length).toBeGreaterThan(0);

    const categoryId = categories[0].id;

    const deleteResponse = await del(
      `/api/categories/${categoryId}`,
      userToken
    );

    expect(deleteResponse.status).toBe(403);
  });

  test('API-USER-PLANT-01: Verify User cannot delete plant via API', async () => {
    const userToken = await loginAndGetToken('testuser', 'test123');
    expect(userToken).toBeTruthy();

    const getResponse = await get('/api/plants', userToken);
    expect(getResponse.status).toBe(200);

    const plants = getResponse.data;
    expect(plants.length).toBeGreaterThan(0);

    const plantId = plants[0].id;

    const deleteResponse = await del(
      `/api/plants/${plantId}`,
      userToken
    );

    expect(deleteResponse.status).toBe(403);
  });

  // 🚧 Known backend issue – User can delete sales via API (should be forbidden)
  test.skip('API-USER-SALE-01: Verify User cannot delete sales record via API', async () => {
    const userToken = await loginAndGetToken('testuser', 'test123');
    expect(userToken).toBeTruthy();

    const getResponse = await get('/api/sales', userToken);
    expect(getResponse.status).toBe(200);

    const sales = getResponse.data;
    expect(sales.length).toBeGreaterThan(0);

    const saleId = sales[0].id;

    const deleteResponse = await del(
      `/api/sales/${saleId}`,
      userToken
    );

    // Expected behavior AFTER backend fix
    expect(deleteResponse.status).toBe(403);
  });

  test('API-USER-CAT-02: Verify delete category request without token', async () => {

  // Step 1: Login as Admin to get a valid category ID
  const adminToken = await loginAndGetToken('admin', 'admin123');
  expect(adminToken).toBeTruthy();

  const getResponse = await get('/api/categories', adminToken);
  expect(getResponse.status).toBe(200);

  const categories = getResponse.data;
  expect(categories.length).toBeGreaterThan(0);

  const categoryId = categories[0].id;

  // Step 2: Attempt DELETE WITHOUT token
  const deleteResponse = await del(`/api/categories/${categoryId}`);

  // Step 3: Verify Unauthorized
  expect(deleteResponse.status).toBe(401);
});
test('API-USER-CAT-03: Verify User delete with invalid category ID', async () => {

  // Step 1: Login as User
  const userToken = await loginAndGetToken('testuser', 'test123');
  expect(userToken).toBeTruthy();

  // Step 2: Use an invalid category ID
  const invalidCategoryId = 999999;

  // Step 3: Attempt DELETE with invalid ID
  const deleteResponse = await del(
    `/api/categories/${invalidCategoryId}`,
    userToken
  );

  // Step 4: Verify proper error response
  expect([403, 404]).toContain(deleteResponse.status);
});

});
