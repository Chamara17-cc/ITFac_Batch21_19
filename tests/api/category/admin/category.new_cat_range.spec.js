const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify category name length validation', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);

    // Too short
    const shortNameResponse = await authRequest.post('/api/categories', {
        data: { name: 'C', subCategories: [] }
    });

    expect(shortNameResponse.status()).toBe(400);
    const shortBody = await shortNameResponse.json();
    console.log('SHORT BODY:', shortBody);

    expect(shortBody.details.name).toBe('Category name must be between 3 and 10 characters');
    expect(shortBody.error).toBe('BAD_REQUEST');
    expect(shortBody.message).toBe('Validation failed');

    // Too long
    const longNameResponse = await authRequest.post('/api/categories', {
        data: { name: 'VeryLongName123', subCategories: [] }
    });

    expect(longNameResponse.status()).toBe(400);
    const longBody = await longNameResponse.json();
    console.log('LONG BODY:', longBody);

    expect(longBody.details.name).toBe('Category name must be between 3 and 10 characters');
    expect(longBody.error).toBe('BAD_REQUEST');
    expect(longBody.message).toBe('Validation failed');
});
