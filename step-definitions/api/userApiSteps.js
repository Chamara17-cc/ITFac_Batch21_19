// step-definitions/api/userApiSteps.js
const { When, Then } = require('@cucumber/cucumber');

When('the user tries to create a plant under subcategory {int}', async function (subCategoryId) {
    const userRequest = await this.getUserRequest();

    const payload = {
        name: 'RosePlant',
        price: 120,
        quantity: 10,
        stock: 10
    };

    this.response = await userRequest.post(`/api/plants/category/${subCategoryId}`, { data: payload });
});

When('the user tries to create a sale for plant {int} with quantity {int}', async function (plantId, quantity) {
    const userRequest = await this.getUserRequest();
    this.response = await userRequest.post(`/api/sales/plant/${plantId}?quantity=${quantity}`);
});

Then('the response should contain NOT_FOUND error', async function () {
    const body = await this.response.json();
    expect(body.error).toBe('NOT_FOUND');
    expect(body).toHaveProperty('status', 404);
    expect(body).toHaveProperty('message');
});

When('the admin creates a plant under subcategory {int}', async function (subCategoryId) {
    const adminRequest = await this.getAdminRequest();

    const plantName = `RosePlant_${Math.floor(Math.random() * 1000000)}`.slice(0, 15);
    const payload = {
        name: plantName,
        price: 120,
        quantity: 10,
        stock: 10
    };

    // Save response to this.response instead of asserting here
    this.response = await adminRequest.post(`/api/plants/category/${subCategoryId}`, { data: payload });

    const plant = await this.response.json();
    this.plantId = plant.id;
    this.plantName = plant.name;
});

When('the user tries to create a sale using the plant', async function () {
    const userRequest = await this.getUserRequest();
    this.response = await userRequest.post(`/api/sales/plant/${this.plantId}?quantity=1`);
});
