// Import Playwright's test runner and assertion library
const { test, expect } = require('@playwright/test');

// Import reusable API helper functions
const {
  initApi,            // Initializes API request context
  closeApi,           // Closes API request context
  loginAndGetToken,   // Logs in and returns JWT token
  get                 // Performs GET API requests
} = require('../../../utils/apiUtils');

// Variable to store admin JWT token
let adminToken;

// Runs ONCE before all test cases
test.beforeAll(async () => {
  // Initialize Playwright API context
  await initApi();

  // Login as admin and retrieve JWT token
  adminToken = await loginAndGetToken('admin', 'admin123');

  // Ensure token is successfully received
  expect(adminToken).not.toBeNull();
});

// Runs ONCE after all test cases
test.afterAll(async () => {
  // Close API context and free resources
  await closeApi();
});

// ---------------- TEST CASE 11 ----------------
test('API-ADMIN-CAT-GET-11 | Get category by valid ID', async () => {

  // Send GET request with valid category ID and admin token
  const res = await get('/api/categories/1', adminToken);

  // Verify HTTP status code is 200 (Success)
  expect(res.status).toBe(200);

  // Verify response contains category ID = 1
  expect(res.data).toHaveProperty('id', 1);
});

// ---------------- TEST CASE 12 ----------------
test('API-ADMIN-CAT-GET-12 | Get category by invalid ID', async () => {

  // Send GET request with non-existent category ID
  const res = await get('/api/categories/100', adminToken);

  // Log response for debugging purposes
  console.log('Response:', res);

  // Verify HTTP status code is 404 (Not Found)
  expect(res.status).toBe(404);

  // Verify error message exists in response
  expect(res.data).toHaveProperty('message');

  // Verify error message content
  expect(res.data.message).toContain('Category not found');
});

// ---------------- TEST CASE 13 ----------------
test('API-ADMIN-CAT-GET-13 | Combined filters (name + parentId)', async () => {

  // Send GET request with query parameters
  const res = await get(
    '/api/categories?name=Flower&parentId=1',
    adminToken
  );

  // Verify HTTP status code
  expect(res.status).toBe(200);

  // Verify response is an array
  expect(Array.isArray(res.data)).toBe(true);

  // Validate each returned category
  res.data.forEach(cat => {
    expect(cat.name).toContain('Flower');
    expect(cat.parentId).toBe(1);
  });
});

// ---------------- TEST CASE 14 ----------------
test('API-ADMIN-CAT-GET-14 | Get all subcategories', async () => {

  // Send GET request to fetch all subcategories
  const res = await get(
    '/api/categories/sub-categories',
    adminToken
  );

  // Verify success response
  expect(res.status).toBe(200);

  // Verify response is a list
  expect(Array.isArray(res.data)).toBe(true);
});

// ---------------- TEST CASE 15 ----------------
test('API-ADMIN-CAT-GET-15 | Unauthorized access attempt', async () => {

  // Send GET request WITHOUT token
  const res = await get('/api/categories/1');

  // Verify unauthorized access is blocked
  expect(res.status).toBe(401);
});
