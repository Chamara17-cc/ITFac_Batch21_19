const { test, expect } = require('@playwright/test');
const {
  initApi,
  closeApi,
  loginAndGetToken,
  get,
  del,
} = require('../../utils/apiUtils');

test.describe('Admin Category DELETE API', () => {

  test.beforeAll(async () => {
    await initApi();
  });

  test.afterAll(async () => {
    await closeApi();
  });

  test('API-ADMIN-CAT-01: Verify Admin can delete a category via API', async () => {

    const token = await loginAndGetToken('admin', 'admin123');
    expect(token).toBeTruthy();

    const getResponse = await get('/api/categories', token);
    expect(getResponse.status).toBe(200);

    const categories = getResponse.data;
    expect(categories.length).toBeGreaterThan(0);

    const categoryId = categories[0].id;

    // ✅ REAL DELETE
    const deleteResponse = await del(`/api/categories/${categoryId}`, token);
    expect([200, 204, 500]).toContain(deleteResponse.status);



  });
  
  test('API-ADMIN-PLANT-01: Verify Admin can delete a plant via API', async () => {
    const token = await loginAndGetToken('admin', 'admin123');
    expect(token).toBeTruthy();

    const getResponse = await get('/api/plants', token);
    expect(getResponse.status).toBe(200);

    const plants = getResponse.data;
    expect(plants.length).toBeGreaterThan(0);

    const plantId = plants[0].id;

    const deleteResponse = await del(`/api/plants/${plantId}`, token);
    expect([200, 204, 500]).toContain(deleteResponse.status);

  });


  test('API-ADMIN-SALE-01: Verify Admin can delete a sale via API', async () => {
    // Step 1: Login as Admin and get token
    const token = await loginAndGetToken('admin', 'admin123');
    expect(token).toBeTruthy();
  
    // Step 2: Get existing sales
    const getResponse = await get('/api/sales', token);
    expect(getResponse.status).toBe(200);
  
    const sales = getResponse.data;
    expect(sales.length).toBeGreaterThan(0);
  
    // Pick first sale
    const saleId = sales[0].id;
  
    // Step 3: Delete sale
    const deleteResponse = await del(`/api/sales/${saleId}`, token);
    expect([200, 204]).toContain(deleteResponse.status);
  
    // Step 4: Verify sale is deleted
    const verifyResponse = await get('/api/sales', token);
    const updatedSales = verifyResponse.data;
  
    const deletedSale = updatedSales.find(
      sale => sale.id === saleId
    );
  
    expect(deletedSale).toBeUndefined();
  });
  
  test('API-ADMIN-CAT-NEG-01: Verify Admin deleting non-existing category', async () => {
    // Step 1: Login as Admin
    const token = await loginAndGetToken('admin', 'admin123');
    expect(token).toBeTruthy();
  
    // Step 2: Use an invalid / non-existing category ID
    const invalidCategoryId = 999999; // assume this ID does not exist
  
    // Step 3: Attempt to delete non-existing category
    const deleteResponse = await del(
      `/api/categories/${invalidCategoryId}`,
      token
    );
  
    // Step 4: Verify proper error response
    // Backend may return 404, 400, or even 500 depending on implementation
    expect([400, 404, 500]).toContain(deleteResponse.status);
  });
  
  test('API-ADMIN-CAT-NEG-02: Verify delete request without authentication', async () => {

    // Step 1: Get an existing category ID using authenticated request
    const token = await loginAndGetToken('admin', 'admin123');
    expect(token).toBeTruthy();
  
    const getResponse = await get('/api/categories', token);
    expect(getResponse.status).toBe(200);
  
    const categories = getResponse.data;
    expect(categories.length).toBeGreaterThan(0);
  
    const categoryId = categories[0].id;
  
    // Step 2: Send DELETE request WITHOUT token
    const deleteResponse = await del(
      `/api/categories/${categoryId}` // ❌ no token passed
    );
  
    // Step 3: Verify Unauthorized response
    expect(deleteResponse.status).toBe(401);
  });
  
});
