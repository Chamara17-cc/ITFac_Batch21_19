class SalesPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('h1, h2, .sales, .Sales').first();
  }

  async goto() {
    await this.page.goto('/ui/sales');
  }

  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ timeout: 5000 });
  }
}

module.exports = { SalesPage };
