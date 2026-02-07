const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the response status should be {int}', async function (status) {
    expect(this.response.status()).toBe(status);
});
