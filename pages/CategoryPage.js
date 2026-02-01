class CategoryPage {
  constructor(page) {
    this.page = page;
    this.url = '/ui/categories';

    // ✅ Table rows as a locator, not string
    this.tableRows = page.locator('table tbody tr');

    // Page title locator
    this.pageTitle = page.locator('h3.mb-4', { hasText: 'Categories' });
  }

  // Open the Categories page
  async open() {
    await this.page.goto(this.url);
  }

  // Check if a category exists by name
  async categoryExists(categoryName) {
    const count = await this.tableRows
      .filter({ hasText: categoryName }) // works because tableRows is now a locator
      .count();

    return count > 0;
  }

  // Return page header locator
  pageHeader() {
    return this.pageTitle;
  }

  // Get total number of categories in the table
  async fetCategoryCount() {
    return await this.tableRows.count();
  }

  // Optional: add category method if needed
  async addCategory(categoryName) {
    // Implement category creation here if required for precondition
  }
}

module.exports = { CategoryPage };
