class SalesPage {


  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('h1, h2, .sales, .Sales').first();
    this.noSalesMessage = page.locator('table tbody tr td[colspan="5"]');
    this.sellPlantButton = page.locator('a[href="/ui/sales/new"]');
    this.deleteButtons = page.locator('form[action^="/ui/sales/delete"] button');
    this.soldAtCells = page.locator('table tbody tr td:nth-child(4)');
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

    async verifyDeleteButtonVisible() {
    await this.deleteButtons.first().waitFor({ timeout: 5000 });
  }

    async getSoldAtDates() {
    const texts = await this.soldAtCells.allTextContents();
    return texts.map(t => new Date(t.replace(' ', 'T')));
  }

}

module.exports = { SalesPage };
