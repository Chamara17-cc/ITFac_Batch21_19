const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify sales list retrieval with pagination (page & size)', async ({ request }) => {
    const adminRequest = await getAdminAuthContext(request);

    const page = 0;
    const size = 2;

    const response = await adminRequest.get(
        `/api/sales/page?page=${page}&size=${size}`
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Pagination assertions
    expect(body).toHaveProperty('content');
    expect(Array.isArray(body.content)).toBe(true);
    expect(body.content.length).toBeLessThanOrEqual(size);

    expect(body).toHaveProperty('number');
    expect(body.number).toBe(page);

    expect(body).toHaveProperty('size');
    expect(body.size).toBe(size);

    expect(body).toHaveProperty('totalElements');
    expect(body).toHaveProperty('totalPages');

    console.log(`✅ Page ${page} returned ${body.content.length} sales`);
});
