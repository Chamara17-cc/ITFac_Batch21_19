const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify plant can be created', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);
    const uniqueName = `RosePlant_${Math.floor(Math.random() * 1000000)}`.slice(0, 15);
    const subCategoryId = 13;

    const plantPayload = {
        name: uniqueName,
        price: 120,
        quantity: 10,
        stock: 10
    };

    const response = await authRequest.post(
        `/api/plants/category/${subCategoryId}`,
        { data: plantPayload }
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    expect(response.status()).toBe(201);
});
