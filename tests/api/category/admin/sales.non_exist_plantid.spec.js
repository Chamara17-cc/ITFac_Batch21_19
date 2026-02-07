const { test, expect } = require('@playwright/test');
const { getAdminAuthContext, getUserAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify validation for invalid plantId - 404 Not Found', async ({ request }) => {
    const userRequest = await getUserAuthContext(request);
    const invalidPlantId = 9999;
    const quantity = 1;
    const response = await userRequest.post(
        `/api/sales/plant/${invalidPlantId}?quantity=${quantity}`
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toHaveProperty('status', 404);
    expect(body).toHaveProperty('error', 'NOT_FOUND');
    expect(body).toHaveProperty('message');

});
