// Plant Page for User (UI)
class PlantPageUser {
  constructor(page) {
    this.page = page;
    this.url = '/ui/plants';

    // Columns
    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });
    this.plantNameCells = page.locator('table tbody tr td:nth-child(1)');

    // Actions (should NOT be visible for user)
    this.editButtons = page.locator('button', { hasText: 'Edit' });
    this.deleteButtons = page.locator('button', { hasText: 'Delete' });
  }

  async open() {
    await this.page.goto(this.url);
  }

  async clickNameColumn() {
    await this.nameColumnHeader.click();
  }

  async getPlantNames() {
    return await this.plantNameCells.allTextContents();
  }

  // ✅ Updated: Check how many Edit buttons are actually visible
  async getVisibleEditCount() {
    const count = await this.editButtons.count();
    let visibleCount = 0;

    for (let i = 0; i < count; i++) {
      if (await this.editButtons.nth(i).isVisible()) visibleCount++;
    }

    return visibleCount;
  }

  // ✅ Updated: Check how many Delete buttons are actually visible
  async getVisibleDeleteCount() {
    const count = await this.deleteButtons.count();
    let visibleCount = 0;

    for (let i = 0; i < count; i++) {
      if (await this.deleteButtons.nth(i).isVisible()) visibleCount++;
    }

    return visibleCount;
  }
}

module.exports = { PlantPageUser };
