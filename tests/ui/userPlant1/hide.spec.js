const { test, expect } = require('@playwright/test');
const { PlantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

test('UI-USER-PLANT-06 | Hide edit and delete actions for user', async ({ page }) => {

  // ---------------- PRECONDITION ----------------
  // Log in to the system as a normal user
  await loginAsUser(page);

  // ---------------- PAGE OBJECT CREATION ----------------
  // The same browser page is passed to the Page Object
  const plantPage = new PlantPageUser(page);

  await plantPage.open();

  // ---------------- VALIDATION ----------------
  // Get the number of VISIBLE Edit buttons on the page
  // For a normal user, this should be zero
  const editCount = await plantPage.getVisibleEditCount();

  // Get the number of VISIBLE Delete buttons on the page
  // For a normal user, this should also be zero
  const deleteCount = await plantPage.getVisibleDeleteCount();

  // ---------------- ASSERTIONS ----------------
  // Verify that no Edit buttons are visible for the user
  expect(editCount).toBe(0);

  // Verify that no Delete buttons are visible for the user
  expect(deleteCount).toBe(0);

});
