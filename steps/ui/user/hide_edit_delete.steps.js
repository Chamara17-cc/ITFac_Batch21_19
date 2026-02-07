const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should not see any Edit buttons', async function () {
  const editCount = await this.plantPageUser.getVisibleEditCount();
  expect(editCount).toBe(0);
});

Then('I should not see any Delete buttons', async function () {
  const deleteCount = await this.plantPageUser.getVisibleDeleteCount();
  expect(deleteCount).toBe(0);
});
