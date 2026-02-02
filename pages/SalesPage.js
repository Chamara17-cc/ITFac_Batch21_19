class SalesPage {
  constructor(page) {
    this.page = page;

    // Page title
    this.pageTitle = page.locator('h1, h2, .sales, .Sales').first();

    // No sales message
    this.noSalesMessage = page.locator(
      'table tbody tr td[colspan="5"]'
    );
    // Sell Plant button
    this.sellPlantButton = page.locator(
      'a[href="/ui/sales/new"]'
    );

  }



  

  async goto() {
    await this.page.goto('/ui/sales');
  }

  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ timeout: 5000 });
  }

  async verifyNoSalesMessage() {
    await this.noSalesMessage.waitFor({ timeout: 5000 });
  }

  async verifySellPlantButtonVisible() {
    await this.sellPlantButton.waitFor({ timeout: 5000 });
  }


}

module.exports = { SalesPage };
