const { request } = require('@playwright/test');

async function getAdminAuthContext(baseRequest) {
    const loginResponse = await baseRequest.post(
        'http://localhost:8080/api/auth/login',
        {
            data: {
                username: 'admin',
                password: 'admin123'
            }
        }
    );

    if (loginResponse.status() !== 200) {
        throw new Error(`Admin login failed: ${loginResponse.status()}`);
    }

    const loginBody = await loginResponse.json();
    const token = loginBody.token || loginBody.accessToken || loginBody.jwt;

    if (!token) {
        throw new Error('Token not found in admin login response');
    }

    return await request.newContext({
        baseURL: 'http://localhost:8080',
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    });
}


async function getUserAuthContext(baseRequest) {
    const loginResponse = await baseRequest.post(
        'http://localhost:8080/api/auth/login',
        {
            data: {
                username: 'testuser',       
                password: 'test123'     
            }
        }
    );

    if (loginResponse.status() !== 200) {
        throw new Error(`User login failed: ${loginResponse.status()}`);
    }

    const loginBody = await loginResponse.json();
    const token = loginBody.token || loginBody.accessToken || loginBody.jwt;

    if (!token) {
        throw new Error('Token not found in user login response');
    }

    return await request.newContext({
        baseURL: 'http://localhost:8080',
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    });
}

module.exports = {getAdminAuthContext,getUserAuthContext};
