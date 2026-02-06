const { Given } = require('@cucumber/cucumber');
const { loginAsAdmin } = require('../../../utils/authHelper');

Given('admin is logged in', async function () {
  await loginAsAdmin(this.page);
});
