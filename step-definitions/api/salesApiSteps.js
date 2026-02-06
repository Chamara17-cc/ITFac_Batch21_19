const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('the admin retrieves sales page {int} with size {int}', async function (page, size) {
    const adminRequest = await this.getAdminRequest();
    this.response = await adminRequest.get(`/api/sales/page?page=${page}&size=${size}`);
});

Then('the sales list response should be valid with page {int} and size {int}', async function (page, size) {
    expect(this.response.status()).toBe(200);
    const body = await this.response.json();
    expect(body).toHaveProperty('content');
    expect(Array.isArray(body.content)).toBe(true);
    expect(body.content.length).toBeLessThanOrEqual(size);
    expect(body.number).toBe(page);
    expect(body.size).toBe(size);
    expect(body).toHaveProperty('totalElements');
    expect(body).toHaveProperty('totalPages');
});

When('the admin retrieves an empty sales list', async function () {
    const adminRequest = await this.getAdminRequest();
    this.response = await adminRequest.get('/api/sales/page?page=0&size=5');
});

Then('the sales list should be empty', async function () {
    expect(this.response.status()).toBe(200);
    const body = await this.response.json();
    expect(body).toHaveProperty('content');
    expect(body.content.length).toBe(0);
});

When('the admin retrieves sales page {int} with size {int} to check sorting', async function (page, size) {
    const adminRequest = await this.getAdminRequest();
    this.response = await adminRequest.get(`/api/sales/page?page=${page}&size=${size}`);
});

Then('the sales should be sorted by soldAt descending', async function () {
    const body = await this.response.json();
    expect(body).toHaveProperty('content');
    const soldDates = body.content.map(sale => new Date(sale.soldAt));
    for (let i = 0; i < soldDates.length - 1; i++) {
        expect(soldDates[i].getTime()).toBeGreaterThanOrEqual(soldDates[i + 1].getTime());
    }
});
