// Plant Page Object for User UI
// This class follows the Page Object Model (POM) design pattern
// It contains all locators and actions related to the Plant List page for a USER

class plantPageUser {

  // Constructor receives the Playwright page object
  constructor(page) {

    // Store the page instance so all methods can use it
    this.page = page;

    // URL of the plant list page for user
    this.url = '/ui/plants';

    // ---------------- COLUMN LOCATORS ----------------

    // Locator for the "Name" column header (used for sorting by name)
    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });

    // Locator for all plant name cells (1st column in table)
    this.plantNameCells = page.locator('table tbody tr td:nth-child(1)');

    // ---------------- PRICE COLUMN ----------------

    // Locator for the "Price" column header (clickable sorting link)
    this.priceColumnHeader = page.getByRole('link', { name: 'Price' });

    // Locator for all price cells (3rd column in table)
    // NOTE: nth-child index must match actual table structure
    this.priceColumnCells = page.locator('table tbody tr td:nth-child(3)');

    // ---------------- ACTION BUTTONS ----------------
    // These buttons should be HIDDEN for normal users

    // Locator for all Edit buttons
    this.editButtons = page.locator('button', { hasText: 'Edit' });

    // Locator for all Delete buttons
    this.deleteButtons = page.locator('button', { hasText: 'Delete' });

    // ---------------- SEARCH & RESET ----------------

    // Locator for the plant search input field
    this.searchInput = page.locator('input[placeholder="Search plant"]');

    // Locator for Reset button
    this.resetBtn = page.locator('a.btn', { hasText: 'Reset' });
  }

  // ---------------- PAGE ACTIONS ----------------

  // Open the Plant List page
  async open() {
    // Navigate to the plant list URL
    await this.page.goto(this.url);

   
    // This ensures table data is loaded
    await this.plantNameCells.first().waitFor();
  }

  // Click on Name column header to sort plants by name
  async clickNameColumn() {
    // Click the Name column header
    await this.nameColumnHeader.click();

    // Wait until table updates after sorting
    await this.plantNameCells.first().waitFor();
  }

  // Click on Price column header to sort plants by price
  async clickPriceColumn() {
    // Click the Price column header
    await this.priceColumnHeader.click();

    // Wait until all network calls finish
    await this.page.waitForLoadState('networkidle');
  }

  // ---------------- DATA FETCH METHODS ----------------

  // Get all plant names from the table
  async getPlantNames() {
    // Returns an array of text values from plant name column
    return await this.plantNameCells.allTextContents();
  }

  // Get all plant prices as NUMBERS
  async getPlantPrices() {

    // Get all price text values from UI
    const priceValues = await this.priceColumnCells.allTextContents();

    // Convert price strings (Rs. 120.00) → numbers (120)
    return priceValues.map(price =>
      Number(String(price).replace(/[^0-9.-]+/g, ''))
    );
  }

  // ---------------- VISIBILITY CHECKS ----------------

  // Count how many Edit buttons are VISIBLE
  async getVisibleEditCount() {

    // Get total number of Edit buttons in DOM
    const count = await this.editButtons.count();

    // Variable to track visible buttons
    let visibleCount = 0;

    // Loop through each Edit button
    for (let i = 0; i < count; i++) {

      // Check visibility of each button
      if (await this.editButtons.nth(i).isVisible()) {
        visibleCount++;
      }
    }

    // Return total visible Edit buttons
    return visibleCount;
  }

  // Count how many Delete buttons are VISIBLE
  async getVisibleDeleteCount() {

    // Get total Delete buttons in DOM
    const count = await this.deleteButtons.count();

    // Variable to track visible buttons
    let visibleCount = 0;

    // Loop through each Delete button
    for (let i = 0; i < count; i++) {

      // Check visibility of each Delete button
      if (await this.deleteButtons.nth(i).isVisible()) {
        visibleCount++;
      }
    }

    // Return total visible Delete buttons
    return visibleCount;
  }

  // ---------------- SEARCH & RESET ----------------

  // Search plant by name
  async searchPlant(searchText) {

    // Type search keyword into search box
    await this.searchInput.fill(searchText);

    // Press Enter to trigger search
    await this.searchInput.press('Enter');

    // Wait until search results load
    await this.plantNameCells.first().waitFor();
  }

  // Reset the search results
  async resetSearch() {

    // Click Reset button
    await this.resetBtn.click();

    // Wait until full plant list reloads
    await this.plantNameCells.first().waitFor();
  }
}

// Export the page class so test files can use it
module.exports = { plantPageUser };
