const { Then } = require('@cucumber/cucumber');

Then('no plants message should be shown if list is empty', async function () {
  const count = await this.plantPage.getPlantCount();

  if (count === 0) {
    await this.plantPage.expectNoPlantsMessage();
  }
});