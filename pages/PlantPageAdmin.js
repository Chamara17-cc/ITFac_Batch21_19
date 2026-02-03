// Plant Page – Admin role only
class PlantPageAdmin {
  constructor(page) {
    this.page = page;

    // Buttons
    this.addPlantBtn = page.getByRole('button', { name: 'Add Plant' });
    this.editBtn = page.locator('button', { hasText: 'Edit' }).first();
    this.deleteBtn = page.locator('button', { hasText: 'Delete' }).first();

    // Edit form
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
  }
}

module.exports = { PlantPageAdmin };
