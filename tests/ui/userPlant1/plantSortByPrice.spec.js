const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { plantPageUser } = require('../../../pages/plantPageUser');

test.describe('User Plants Sorting Tests', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
    const plantPage = new plantPageUser(page);
    await plantPage.open();
  });

  test('UI-USER-PLANT-01: Verify plants are sorted by price (asc and desc)', async ({ page }) => {
    const plantPage = new plantPageUser(page);

    // ---- ASC sort (first click)
    await plantPage.clickPriceColumn();

    const pricesAsc = await plantPage.getPlantPrices();
    const expectedAsc = [...pricesAsc].sort((a, b) => a - b);

    expect(pricesAsc).toEqual(expectedAsc);

    // ---- DESC sort (second click)
    await plantPage.clickPriceColumn();

    const pricesDesc = await plantPage.getPlantPrices();
    const expectedDesc = [...pricesDesc].sort((a, b) => b - a);

    expect(pricesDesc).toEqual(expectedDesc);
  });

});