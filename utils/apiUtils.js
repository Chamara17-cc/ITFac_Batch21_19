// Import Playwright API request module
const { request } = require('@playwright/test');

// Store API request context
let apiRequest;

// Initialize API context
async function initApi() {
  if (!apiRequest) {
    apiRequest = await request.newContext({
      baseURL: 'http://localhost:8080', // backend base URL
      ignoreHTTPSErrors: true,          // ignore SSL issues
    });
  }
}

// Close API context after tests
async function closeApi() {
  if (apiRequest) {
    await apiRequest.dispose();
    apiRequest = null;
  }
}

// Login API and retrieve JWT token
async function loginAndGetToken(username, password) {
  const response = await apiRequest.post('/api/auth/login', {
    data: { username, password }, // login payload
  });

  // Fail test if login unsuccessful
  if (response.status() !== 200) {
    throw new Error(`Login failed with status ${response.status()}`);
  }

  const body = await response.json();
  return body.token; // return JWT token
}

// Generic GET request helper
async function get(endpoint, token = null) {
  if (!apiRequest)
    throw new Error('API context not initialized. Call initApi() first.');

  const headers = {};

  // Attach Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await apiRequest.get(endpoint, { headers });

  let data = null;
  try {
    data = await response.json(); // safely parse response
  } catch (e) {
    data = null; // handle empty body responses
  }

  return {
    status: response.status(), // HTTP status code
    data,                      // response body
  };
}

// Export helper functions
module.exports = {
  initApi,
  closeApi,
  loginAndGetToken,
  get,
};
