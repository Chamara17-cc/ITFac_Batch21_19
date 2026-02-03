// utils/apiUtils.js
const { request } = require('@playwright/test');

let apiRequest;

async function initApi() {
  if (!apiRequest) {
    apiRequest = await request.newContext({
      baseURL: 'http://localhost:8080',
      ignoreHTTPSErrors: true,
    });
  }
}

async function closeApi() {
  if (apiRequest) {
    await apiRequest.dispose();
    apiRequest = null;
  }
}

// Login and get token
async function loginAndGetToken(username, password) {
  const response = await apiRequest.post('/api/auth/login', {
    data: { username, password },
  });

  if (response.status() !== 200) {
    throw new Error(`Login failed with status ${response.status()}`);
  }

  const body = await response.json();
  return body.token;
}

// GET request helper
async function get(endpoint, token = null) {
  if (!apiRequest) throw new Error('API context not initialized. Call initApi() first.');

  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await apiRequest.get(endpoint, { headers });

  let data = null;
  try {
    data = await response.json(); // safely parse JSON
  } catch (e) {
    data = null; // handle 401/404 with no body
  }

  // ✅ Use response.status() correctly
  return {
    status: response.status(),
    data,
  };
}

module.exports = { initApi, closeApi, loginAndGetToken, get };
