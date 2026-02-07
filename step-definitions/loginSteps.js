const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/loginPage');

let browser, page;
let loginPage;

Given('I am on the login page', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    await page.goto('http://localhost:8080/ui/login');
});


When('I login with username {string} and password {string}', async function (username, password) {
    await loginPage.login(username, password);
});

Then('I should be redirected to the dashboard', async function () {
    await expect(page).toHaveURL('http://localhost:8080/ui/dashboard');
});

After(async function () {
    if (browser) {
        await browser.close();
    }
});

