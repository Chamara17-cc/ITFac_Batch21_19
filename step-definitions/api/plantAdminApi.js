const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I create a plant under subcategory {int}', async function (subCategoryId) {
    const authRequest = await this.getAdminRequest();
    const uniqueName = `RosePlant_${Math.floor(Math.random() * 1000000)}`.slice(0, 15);

    const payload = {
        name: uniqueName,
        price: 120,
        quantity: 10,
        stock: 10
    };

    this.response = await authRequest.post(`/api/plants/category/${subCategoryId}`, { data: payload });
});

When('a user buys a plant with invalid id {int} and quantity {int}', async function (plantId, quantity) {
    const userRequest = await this.getUserRequest();

    this.response = await userRequest.post(`/api/sales/plant/${plantId}?quantity=${quantity}`);
});

Then('response should contain NOT_FOUND error', async function () {
    const body = await this.response.json();
    expect(body.error).toBe('NOT_FOUND');
    expect(body).toHaveProperty('status', 404);
    expect(body).toHaveProperty('message');
});
