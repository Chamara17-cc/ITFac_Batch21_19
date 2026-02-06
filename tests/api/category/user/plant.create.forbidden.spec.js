const { test, expect } = require('@playwright/test');
const { getUserAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify User cannot create plant - 403 Forbidden', async ({ request }) => {
    const userRequest = await getUserAuthContext(request);

    const subCategoryId = 13;

    const plantPayload = {
        name: 'RosePlant',
        price: 120,
        quantity: 10,
        stock: 10
    };

    const response = await userRequest.post(
        `/api/plants/category/${subCategoryId}`,
        { data: plantPayload }
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    expect(response.status()).toBe(403);
});
