const { CategoryPage } = require('../pages/CategoryPage');

async function ensureCategoryExists(page, categoryName) {
  const categoryPage = new CategoryPage(page);
  await categoryPage.open();

  const exists = await categoryPage.categoryExists(categoryName);
  if (!exists) {
    await categoryPage.addCategory(categoryName);
  }
}

module.exports = { ensureCategoryExists };