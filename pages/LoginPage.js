const { URLS, SELECTORS, ERROR_MESSAGES } = require('../config/constants');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.usernameInput = page.locator(SELECTORS.LOGIN.USERNAME_INPUT);
    this.passwordInput = page.locator(SELECTORS.LOGIN.PASSWORD_INPUT);
    this.loginButton = page.locator(SELECTORS.LOGIN.LOGIN_BUTTON);
    this.errorMessage = page.locator(SELECTORS.LOGIN.ERROR_MESSAGE);
    
    // Product page elements (to verify successful login)
    this.productsContainer = page.locator(SELECTORS.PRODUCTS.CONTAINER);
    this.logo = page.locator(SELECTORS.PRODUCTS.LOGO);
  }

  /**
   * Navigate to the login page
   * @throws {Error} If navigation fails
   */
  async goto() {
    await super.goto(URLS.LOGIN_PAGE);
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
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Verify successful login by checking products page elements
   * @returns {Promise<boolean>} True if logged in successfully
   */
  async isLoggedIn() {
    return await this.isVisible(this.productsContainer);
  }
}

module.exports = LoginPage;
