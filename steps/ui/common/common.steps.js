const { Given, When } = require('@cucumber/cucumber');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { AdminDashboardPage } = require('../../../pages/AdminDashboardPage');

Given('admin is logged into the application', async function () {
  await loginAsAdmin(this.page);
});

When('admin opens the dashboard page', async function () {
  this.adminDashboard = new AdminDashboardPage(this.page);
  await this.adminDashboard.open();
});
