const { request } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080'; 

/**
 * Get admin auth request context
 */
async function getAdminAuthContext() {
    const apiContext = await request.newContext({
        baseURL: BASE_URL
    });

    // Log in as admin to get token
    const loginRes = await apiContext.post('/api/auth/login', {
        data: {
            username: 'admin',
            password: 'admin123'
        }
    });
    const loginBody = await loginRes.json();
    const token = loginBody.token;

    // Return context with auth header
    return request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Get normal user auth request context
 */
async function getUserAuthContext() {
    const apiContext = await request.newContext({
        baseURL: BASE_URL
    });

    const loginRes = await apiContext.post('/api/auth/login', {
        data: {
            username: 'testuser',
            password: 'test123'
        }
    });
    const loginBody = await loginRes.json();
    const token = loginBody.token;

    return request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}

module.exports = {
    getAdminAuthContext,
    getUserAuthContext
};
