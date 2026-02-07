const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify response when no sales records exist', async ({ request }) => {
    const adminRequest = await getAdminAuthContext(request);
    const response = await adminRequest.get('/api/sales/page?page=0&size=5');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('content');
    expect(Array.isArray(body.content)).toBe(true);

    expect(body.content.length).toBe(0);

    console.log('✅ Empty sales list returned as expected');
});
