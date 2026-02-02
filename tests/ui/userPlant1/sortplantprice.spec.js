const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper'); // ✅ use user login
const { PlantPageUser } = require('../../../pages/PlantPageUser');

// Helpers
const isAscending = arr => arr.every((v, i) => i === 0 || arr[i - 1] <= v);
const isDescending = arr => arr.every((v, i) => i === 0 || arr[i - 1] >= v);

test.beforeEach(async ({ page }) => {
  await loginAsUser(page); // ✅ login as normal user
});

test('UI-USER-PLANT-10 | Sort plants by price', async ({ page }) => {
  const plantPage = new PlantPageUser(page);

  // Open plant list page
  await plantPage.open();

  // 🔹 Record initial prices (unsorted, page loads sorted by plant name)
  const initialPrices = await plantPage.getPlantPrices();

  // 🔹 FIRST CLICK → should sort ASC
  await plantPage.clickPriceColumn();
  await expect.poll(async () => {
    const prices = await plantPage.getPlantPrices();
    return isAscending(prices);
  }, { timeout: 5000, interval: 200 }).toBe(true);

  const ascPrices = await plantPage.getPlantPrices();
  expect(isAscending(ascPrices)).toBe(true);

  // 🔹 SECOND CLICK → should sort DESC
  await plantPage.clickPriceColumn();
  await expect.poll(async () => {
    const prices = await plantPage.getPlantPrices();
    return isDescending(prices);
  }, { timeout: 5000, interval: 200 }).toBe(true);

  const descPrices = await plantPage.getPlantPrices();
  expect(isDescending(descPrices)).toBe(true);

  // 🔹 OPTIONAL: THIRD CLICK → toggle back to ASC
  await plantPage.clickPriceColumn();
  await expect.poll(async () => {
    const prices = await plantPage.getPlantPrices();
    return isAscending(prices);
  }, { timeout: 5000, interval: 200 }).toBe(true);
});
