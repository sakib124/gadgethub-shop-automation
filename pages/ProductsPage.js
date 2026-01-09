const { SELECTORS, TIMEOUTS, ERROR_MESSAGES } = require('../config/constants');

class ProductsPage {
  constructor(page) {
    this.page = page;
    
    // Header elements
    this.logo = page.locator(SELECTORS.PRODUCTS.LOGO);
    this.hamburgerMenu = page.locator(SELECTORS.PRODUCTS.MENU_BUTTON);
    this.cartIcon = page.locator(SELECTORS.PRODUCTS.CART_ICON);
    this.cartBadge = page.locator(SELECTORS.PRODUCTS.CART_BADGE);
    
    // Page elements
    this.pageTitle = page.locator('h2:has-text("Products")');
    this.productsContainer = page.locator(SELECTORS.PRODUCTS.CONTAINER);
    this.productCards = page.locator(SELECTORS.PRODUCTS.PRODUCT_CARD);
    this.sortDropdown = page.locator('select[name="sort"], .sort-dropdown');
    
    // Sidebar menu elements
    this.sidebar = page.locator('.sidebar, .menu-sidebar');
    this.allItemsLink = page.locator('a:has-text("All Items")');
    this.aboutLink = page.locator('a:has-text("About")');
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.resetAppLink = page.locator('a:has-text("Reset App State")');
  }

  /**
   * Get a product card by product name
   * @param {string} productName - The name of the product
   * @returns {Locator} The product card locator
   */
  getProductCard(productName) {
    return this.page.locator(`.product-card:has-text("${productName}")`);
  }

  /**
   * Get the add/remove button for a specific product
   * @param {string} productName - The name of the product
   * @returns {Locator} The button locator
   */
  getProductButton(productName) {
    return this.getProductCard(productName).locator('button');
  }

  /**
   * Get the button text for a specific product
   * @param {string} productName - The name of the product
   * @returns {Promise<string>} The button text
   * @throws {Error} If button not found
   */
  async getProductButtonText(productName) {
    try {
      const button = this.getProductButton(productName);
      return await button.textContent();
    } catch (error) {
      throw new Error(`Failed to get button text for ${productName}: ${error.message}`);
    }
  }

  /**
   * Add a product to the cart
   * @param {string} productName - The name of the product to add
   * @throws {Error} If adding product fails
   */
  async addProductToCart(productName) {
    try {
      const button = this.getProductButton(productName);
      const buttonText = await button.textContent();
      
      if (buttonText.trim() === 'Add to cart') {
        await button.click();
        // Explicit wait for network to settle after adding to cart
        await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.CART_UPDATE });
      }
    } catch (error) {
      throw new Error(`Failed to add ${productName} to cart: ${error.message}`);
    }
  }

  /**
   * Remove a product from the cart
   * @param {string} productName - The name of the product to remove
   * @throws {Error} If removing product fails
   */
  async removeProductFromCart(productName) {
    try {
      const button = this.getProductButton(productName);
      const buttonText = await button.textContent();
      
      if (buttonText.trim() === 'Remove') {
        await button.click();
        // Wait for network to settle after removing from cart
        await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.CART_UPDATE });
      }
    } catch (error) {
      throw new Error(`Failed to remove ${productName} from cart: ${error.message}`);
    }
  }

  /**
   * Get the current cart count
   * @returns {Promise<string>} The cart count
   */
  async getCartCount() {
    try {
      const badgeElement = this.cartBadge;
      const isVisible = await badgeElement.isVisible().catch(() => false);
      
      if (!isVisible) {
        return '0';
      }
      
      const count = await badgeElement.textContent();
      return count.trim();
    } catch (error) {
      return '0';
    }
  }

  /**
   * Get the total number of products displayed
   * @returns {Promise<number>} The number of products
   */
  async getProductCount() {
    return await this.productCards.count();
  }

  /**
   * Click on the cart icon
   */
  async clickCartIcon() {
    await this.cartIcon.click();
  }

  /**
   * Click on the hamburger menu
   */
  async clickHamburgerMenu() {
    await this.hamburgerMenu.click();
  }

  /**
   * Check if sidebar is visible
   * @returns {Promise<boolean>} True if sidebar is visible
   */
  async isSidebarVisible() {
    return await this.sidebar.isVisible();
  }

  /**
   * Sort products by a specific option
   * @param {string} sortOption - The sort option text
   */
  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption({ label: sortOption });
    // Wait for sorting to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Get all product names in current order
   * @returns {Promise<string[]>} Array of product names
   */
  async getProductNames() {
    const names = [];
    const count = await this.productCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const nameElement = card.locator('.product-name');
      const name = await nameElement.textContent();
      names.push(name.trim());
    }
    
    return names;
  }

  /**
   * Get all product prices in current order
   * @returns {Promise<number[]>} Array of product prices as numbers
   */
  async getProductPrices() {
    const prices = [];
    const count = await this.productCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const priceElement = card.locator('.product-price');
      const priceText = await priceElement.textContent();
      // Remove $ and convert to number
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }
    
    return prices;
  }

  /**
   * Get the price of a specific product
   * @param {string} productName - The name of the product
   * @returns {Promise<string>} The product price
   */
  async getProductPrice(productName) {
    const card = this.getProductCard(productName);
    const priceElement = card.locator('.product-price');
    return await priceElement.textContent();
  }

  /**
   * Verify if a product card has all required elements
   * @param {number} index - The index of the product card
   * @returns {Promise<boolean>} True if all elements are present
   */
  async productCardHasAllElements(index) {
    const card = this.productCards.nth(index);
    const hasImage = await card.locator('img, .product-image').isVisible();
    const hasName = await card.locator('.product-name').isVisible();
    const hasDescription = await card.locator('.product-description').isVisible();
    const hasPrice = await card.locator('.product-price').isVisible();
    const hasButton = await card.locator('button').isVisible();
    
    return hasImage && hasName && hasDescription && hasPrice && hasButton;
  }

  /**
   * Check if all product images are loaded (not broken)
   * @returns {Promise<boolean>} True if all images are loaded
   */
  async areAllImagesLoaded() {
    const images = this.page.locator('.product-card img, .product-image');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth === 0) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Add all products to the cart
   */
  async addAllProductsToCart() {
    const count = await this.productCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const button = card.locator('button');
      const buttonText = await button.textContent();
      
      if (buttonText.trim() === 'Add to cart') {
        await button.click();
        // Small delay to ensure cart updates
        await this.page.waitForTimeout(200);
      }
    }
  }

  /**
   * Navigate back to products page
   */
  async navigateBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if an option exists in the sort dropdown
   * @param {string} option - The option text
   * @returns {Promise<boolean>} True if option exists
   */
  async sortDropdownHasOption(option) {
    const optionLocator = this.sortDropdown.locator(`option:has-text("${option}")`);
    return await optionLocator.count() > 0;
  }

  /**
   * Verify arrays are sorted alphabetically
   * @param {string[]} array - Array to check
   * @param {boolean} ascending - True for ascending, false for descending
   * @returns {boolean} True if sorted correctly
   */
  isArraySortedAlphabetically(array, ascending = true) {
    for (let i = 0; i < array.length - 1; i++) {
      const comparison = array[i].localeCompare(array[i + 1]);
      if (ascending && comparison > 0) return false;
      if (!ascending && comparison < 0) return false;
    }
    return true;
  }

  /**
   * Verify arrays are sorted numerically
   * @param {number[]} array - Array to check
   * @param {boolean} ascending - True for ascending, false for descending
   * @returns {boolean} True if sorted correctly
   */
  isArraySortedNumerically(array, ascending = true) {
    for (let i = 0; i < array.length - 1; i++) {
      if (ascending && array[i] > array[i + 1]) return false;
      if (!ascending && array[i] < array[i + 1]) return false;
    }
    return true;
  }

  /**
   * Verify all product cards have images
   * @returns {Promise<boolean>} True if all cards have visible images
   */
  async allCardsHaveImages() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const image = card.locator('img, .product-image');
      const isVisible = await image.isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  /**
   * Verify all product cards have names
   * @returns {Promise<boolean>} True if all cards have visible names
   */
  async allCardsHaveNames() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const name = card.locator('.product-name');
      const isVisible = await name.isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  /**
   * Verify all product cards have descriptions
   * @returns {Promise<boolean>} True if all cards have visible descriptions
   */
  async allCardsHaveDescriptions() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const description = card.locator('.product-description');
      const isVisible = await description.isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  /**
   * Verify all product cards have prices
   * @returns {Promise<boolean>} True if all cards have visible prices
   */
  async allCardsHavePrices() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const price = card.locator('.product-price');
      const isVisible = await price.isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

//   /**
//    * Verify all product cards have buttons
//    * @returns {Promise<boolean>} True if all cards have visible buttons
//    */
//   async allCardsHaveButtons(expectedText) {
//     const count = await this.productCards.count();
//     for (let i = 0; i < cardCount; i++) {
//       const card = this.productCards.nth(i);
//       const addToCartButton = card.locator('button', {
//         hasText: expectedText
//       });
//     return true;
//   }

  /**
   * Verify all product buttons show specific text
   * @param {string} expectedText - The expected button text
   * @returns {Promise<boolean>} True if all buttons match the text
   */
  async allButtonsShowText(expectedText) {
    const count = await this.productCards.count();  
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const button = card.locator('button');
      const actualText = await button.textContent();
      if (actualText.trim() !== expectedText) return false;
    }
    return true;
  }
}

module.exports = ProductsPage;
