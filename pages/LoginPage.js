const { URLS, SELECTORS, ERROR_MESSAGES } = require('../config/constants');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.usernameInput = page.locator(SELECTORS.LOGIN.USERNAME_INPUT);
    this.passwordInput = page.locator(SELECTORS.LOGIN.PASSWORD_INPUT);
    this.loginButton = page.locator(SELECTORS.LOGIN.LOGIN_BUTTON);
    this.errorMessage = page.locator(SELECTORS.LOGIN.ERROR_MESSAGE);
    
    // Product page elements (to verify successful login)
    this.productsContainer = page.locator(SELECTORS.PRODUCTS.CONTAINER);
    this.logo = page.locator(SELECTORS.PRODUCTS.LOGO);
    this.shoppingCartLink = page.locator(SELECTORS.PRODUCTS.CART_ICON);
  }

  /**
   * Navigate to the login page
   * @throws {Error} If navigation fails
   */
  async goto() {
    try {
      await this.page.goto(URLS.LOGIN_PAGE);
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.PAGE_OBJECT.NAVIGATION_FAILED}: ${error.message}`);
    }
  }

  /**
   * Perform login with given credentials
   * @param {string} username - The username to login with
   * @param {string} password - The password to login with
   * @throws {Error} If login interaction fails
   */
  async login(username, password) {
    try {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * Get the error message text
   * @returns {Promise<string>} The error message text
   * @throws {Error} If error message element not found
   */
  async getErrorMessage() {
    try {
      return await this.errorMessage.textContent();
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.PAGE_OBJECT.ELEMENT_NOT_FOUND}: Error message`);
    }
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    try {
      return await this.errorMessage.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify successful login by checking products page elements
   * @returns {Promise<boolean>} True if logged in successfully
   */
  async isLoggedIn() {
    try {
      return await this.productsContainer.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the current page URL
   * @returns {string} Current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Check if logo is visible
   * @returns {Promise<boolean>} True if logo is visible
   */
  async isLogoVisible() {
    try {
      return await this.logo.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear login form fields
   * @throws {Error} If clearing fields fails
   */
  async clearLoginForm() {
    try {
      await this.usernameInput.clear();
      await this.passwordInput.clear();
    } catch (error) {
      throw new Error(`Failed to clear login form: ${error.message}`);
    }
  }
}

module.exports = LoginPage;
