class UserDashboardPage {
    constructor(page) {
      this.page = page;
  
      // User dashboard elements
      this.profileSection = page.getByText(/profile/i);
      this.ordersSection = page.getByText(/orders/i);
      this.categoriesSection = page.getByText(/categories/i);
  
      this.logoutBtn = page.getByRole('button', { name: /logout/i });
    }
  
    async gotoDashboard() {
      await this.page.goto('/user/dashboard');
    }
  }
  
  module.exports = { UserDashboardPage };
  