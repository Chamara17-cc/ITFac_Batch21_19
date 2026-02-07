// pages/AdminDashboardPage.js
class AdminDashboardPage {
    constructor(page) {
      this.page = page;

      this.categoriesCard = page.getByRole('heading', { name: 'Categories' });
  
      this.categoriesCardContainer = page
        .locator('.dashboard-card')
        .filter({ hasText: 'Categories' });
  
      this.plantsCard = page
        .locator('.dashboard-card')
        .filter({ hasText: 'Plants' });
  
      this.salesCard = page
        .locator('.dashboard-card')
        .filter({ hasText: 'Sales' });
  
      this.inventoryCard = page
        .locator('.dashboard-card')
        .filter({ hasText: 'Inventory' });
  
      this.manageCategoriesButton = page.getByRole('link', {
        name: 'Manage Categories',
      });
    }
  
    async open() {
      await this.page.goto('/ui/dashboard');
    }
  }
  
  module.exports = { AdminDashboardPage };