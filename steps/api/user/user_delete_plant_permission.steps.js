const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { get, del } = require('../../../utils/apiUtils');

When('user attempts to delete an existing plant', async function () {
  const getResponse = await get('/api/plants', this.userToken);
  expect(getResponse.status).toBe(200);

  const plants = getResponse.data;

  if (!plants || plants.length === 0) {
    this.noPlantAvailable = true;
    return;
  }

  const plantId = plants[0].id;

  this.deleteResponse = await del(
    `/api/plants/${plantId}`,
    this.userToken
  );
});