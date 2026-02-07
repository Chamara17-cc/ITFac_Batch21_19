const { When } = require('@cucumber/cucumber');

When('user sends request to get all plants', async function () {
  this.response = await this.userApi.get('/api/plants');
});

When('user requests plant with id {int}', async function (id) {
  this.response = await this.userApi.get(`/api/plants/${id}`);
});

When('user requests plants by category id {int}', async function (categoryId) {
  this.response = await this.userApi.get(`/api/plants/category/${categoryId}`);
});