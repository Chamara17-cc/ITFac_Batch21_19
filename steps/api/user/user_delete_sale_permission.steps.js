const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, del } = require('../../../utils/apiUtils');

When('user attempts to delete an existing sale', async function () {
  const getResponse = await get('/api/sales', this.userToken);
  expect(getResponse.status).toBe(200);

  const sales = getResponse.data;

  if (!sales || sales.length === 0) {
    this.noSaleAvailable = true;
    return;
  }

  const saleId = sales[0].id;

  this.deleteResponse = await del(
    `/api/sales/${saleId}`,
    this.userToken
  );
});