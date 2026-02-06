//UI-USER-PLANT-06-Verify that edit and delete actions are hidden for user (Done)

const { test, expect } = require('@playwright/test');
const { PlantPageUser } = require('../../../pages/plantPageUser');

const { loginAsUser } = require('../../../utils/authHelper');
test('UI-USER-PLANT-06 | Hide edit and delete actions for user', async ({ page }) => {
  
  // Precondition: user logged in
  await loginAsUser(page);

  const plantPage = new PlantPageUser(page);
  await plantPage.open();

  // Validate Edit & Delete are NOT visible
  const editCount = await plantPage.getVisibleEditCount();
  const deleteCount = await plantPage.getVisibleDeleteCount();

  expect(editCount).toBe(0);
  expect(deleteCount).toBe(0);
});
