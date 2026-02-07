const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I enter valid plant details', async function () {
  const uniquePlantName = `TestPlant_${Date.now()}`;

  await this.addPlantPage.fillBasicDetails({
    name: uniquePlantName,
    categoryIndex: 1,
    price: '120',
    quantity: '15'
  });
});

Then('I should see a success message for adding plant', async function () {
  const successMessage = this.page.locator(
    'text=/plant added successfully/i'
  );
  await expect(successMessage).toBeVisible({ timeout: 10000 });
});
