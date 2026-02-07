const { When, Then } = require('@cucumber/cucumber');

When('I enter plant details with invalid price {string}', async function (price) {
  await this.addPlantPage.fillBasicDetails({
    name: 'Green Rose',     // valid
    categoryIndex: 1,       // valid
    quantity: '10',         // valid
    price                  // invalid (0 or negative)
  });
});

Then('I should see the price greater than zero validation message', async function () {
  await this.addPlantPage.expectPriceError();
});
