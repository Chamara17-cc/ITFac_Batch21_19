const { test, expect } = require('@playwright/test');
const { getAdminAuthContext } = require('../../../../utils/apiAuthHelper');

test('Verify default sorting by soldAt date (DESC) with pagination', async ({ request }) => {
    const adminRequest = await getAdminAuthContext(request);

    const page = 0;
    const size = 5;

    const response = await adminRequest.get(`/api/sales/page?page=${page}&size=${size}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('content');
    expect(Array.isArray(body.content)).toBe(true);

    // Map soldAt dates
    const soldDates = body.content.map(sale => {
        if (!sale.soldAt) {
            throw new Error(`Sale ID ${sale.id} does not have a soldAt`);
        }
        const date = new Date(sale.soldAt);
        if (isNaN(date.getTime())) {
            throw new Error(`Sale ID ${sale.id} has invalid soldAt: ${sale.soldAt}`);
        }
        return date;
    });

    // Check descending order
    for (let i = 0; i < soldDates.length - 1; i++) {
        expect(soldDates[i].getTime()).toBeGreaterThanOrEqual(soldDates[i + 1].getTime());
    }

    console.log('✅ Sales are sorted by soldAt date in descending order');
});


//Bug