const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I sort plants by Name column', async function () {
  await this.plantPageUser.clickNameColumn();
});

Then('I should see the plants sorted alphabetically by Name', async function () {
  const actualPlantNames = await this.plantPageUser.getPlantNames();
  const sortedPlantNames = [...actualPlantNames].sort((a, b) => a.localeCompare(b));
  expect(actualPlantNames).toEqual(sortedPlantNames);
});
