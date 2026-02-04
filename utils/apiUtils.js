// utils/apiUtils.js
const { request } = require('@playwright/test');

let apiContext;

async function initApi() {
  if (!apiContext) {
    apiContext = await request.newContext({
      baseURL: 'http://localhost:8080',
      ignoreHTTPSErrors: true,
    });
  }
}

async function closeApi() {
  if (apiContext) {
    await apiContext.dispose();
    apiContext = null;
  }
}

async function loginAndGetToken(username, password) {
  const response = await apiContext.post('/api/auth/login', {
    data: { username, password },
  });

  const body = await response.json();
  return body.token;
}

async function get(endpoint, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await apiContext.get(endpoint, { headers });

  let data = null;
  try {
    data = await response.json();
  } catch {}

  return {
    status: response.status(),
    data,
  };
}

async function del(endpoint, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await apiContext.delete(endpoint, { headers });

  return {
    status: response.status(),
  };
}

module.exports = {
  initApi,
  closeApi,
  loginAndGetToken,
  get,
  del,
};
