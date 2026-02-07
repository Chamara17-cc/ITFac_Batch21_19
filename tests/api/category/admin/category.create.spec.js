const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify Admin can create category', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);
    const uniqueName = `Cat_${Math.floor(Math.random() * 1000000)}`.slice(0, 10);
    const response = await authRequest.post('/api/categories', {
        data: {
            name: uniqueName,
            subCategories: []
        }
    });


    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());


    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toBe(uniqueName);
});
