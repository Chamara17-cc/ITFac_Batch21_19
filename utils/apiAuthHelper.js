const { request, expect } = require('@playwright/test');

async function getAdminToken() {
  const api = await request.newContext({
    baseURL: 'http://localhost:8080'
  });

  const response = await api.post('/api/auth/login', {
    data: {
      username: 'admin',
      password: 'admin123'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  await api.dispose();
  return body.token;
}

async function getUserToken() {
  const api = await request.newContext({
    baseURL: 'http://localhost:8080'
  });

  const response = await api.post('/api/auth/login', {
    data: {
      username: 'testuser',
      password: 'test123'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  await api.dispose();
  return body.token;
}

module.exports = {
  getAdminToken,
  getUserToken
};