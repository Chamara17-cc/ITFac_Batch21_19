const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Create category with empty name should return 400', async ({ request }) => {

    const authRequest = await getAdminAuthContext(request);

    const response = await authRequest.post('/api/categories', {
        data: {
            name: ''
        }
    });

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('message');
});