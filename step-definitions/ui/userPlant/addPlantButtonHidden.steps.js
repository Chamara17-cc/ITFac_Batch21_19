const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('add plant button should be hidden', async function () {
  const addPlantBtn = this.page.getByRole('link', { name: /add\s*a\s*plant/i });
  await expect(addPlantBtn).toBeHidden();
});