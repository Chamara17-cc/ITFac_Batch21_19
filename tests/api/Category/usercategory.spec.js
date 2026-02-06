const { test, expect } = require('@playwright/test');


// initApi      → creates API request context
// closeApi     → closes API context
// loginAndGetToken → logs in and returns JWT token
// get           → performs GET API calls
const { initApi, closeApi, loginAndGetToken, get } =
  require('../../../utils/apiUtils');

// Variable to store user authentication token
let userToken;

// Group all USER category related API tests together
test.describe('User Category APIs', () => {

  // Runs ONCE before all tests in this describe block
  test.beforeAll(async () => {

    // Initialize Playwright API request context
    await initApi();

    // Login as a normal user and retrieve JWT token
    userToken = await loginAndGetToken('testuser', 'test123');

    // Verify token was successfully received
    expect(userToken).toBeTruthy();
  });

  // Runs ONCE after all tests in this describe block
  test.afterAll(async () => {

    // Close API request context to free resources
    await closeApi();
  });

  // ✅ API-USER-CAT-GET-16
  // Verify user can fetch category using a VALID category ID
  test('API-USER-CAT-GET-16 | Get category by valid ID', async () => {

    // Send GET request with valid category ID and user token
    const res = await get('/api/categories/1', userToken);

    // Verify HTTP response status is 200 (OK)
    expect(res.status).toBe(200);

    // Verify returned category ID matches requested ID
    expect(res.data.id).toBe(1);
  });

  // ✅ API-USER-CAT-GET-17
  // Verify behavior when user requests INVALID category ID
  test('API-USER-CAT-GET-17 | Get category by invalid ID', async () => {

    // Send GET request for a non-existing category
    const res = await get('/api/categories/9999', userToken);

    // Backend should respond with 404 Not Found
    expect(res.status).toBe(404);
  });

  // ✅ API-USER-CAT-GET-18
  // Verify user can retrieve all subcategories
  test('API-USER-CAT-GET-18 | Get all subcategories', async () => {

    // Send GET request for subcategories endpoint
    const res = await get('/api/categories/sub-categories', userToken);

    // Expect successful response
    expect(res.status).toBe(200);

    // Verify response body is an array
    expect(Array.isArray(res.data)).toBe(true);
  });

  // ✅ API-USER-CAT-GET-19
  // Verify unauthorized access when token is NOT provided
  test('API-USER-CAT-GET-19 | Access subcategories without authentication', async () => {

    // Send GET request WITHOUT token
    const res = await get('/api/categories/sub-categories');

    // Backend should reject request with 401 Unauthorized
    expect(res.status).toBe(401);
  });

  // ✅ API-USER-CAT-GET-20
  // Verify filtering subcategories using parentId
  test('API-USER-CAT-GET-20 | Get subcategories using parentId', async () => {

    // Send GET request with parentId query parameter
    const res = await get('/api/categories?parentId=1', userToken);

    // Verify request succeeded
    expect(res.status).toBe(200);

    // Ensure response is an array
    expect(Array.isArray(res.data)).toBe(true);

    // Ensure at least one subcategory is returned
    expect(res.data.length).toBeGreaterThan(0);
  });

});
