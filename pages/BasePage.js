const { ERROR_MESSAGES, TIMEOUTS } = require('../config/constants');

/**
 * Base Page class containing common methods for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   * @throws {Error} If navigation fails
   */
  async goto(url) {
    try {
      await this.page.goto(url);
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.PAGE_OBJECT.NAVIGATION_FAILED}: ${error.message}`);
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
   * Wait for page to load (networkidle state)
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForPageLoad(timeout = TIMEOUTS.DEFAULT) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for a specific URL pattern
   * @param {string|RegExp} urlPattern - URL pattern to wait for
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForUrl(urlPattern, timeout = TIMEOUTS.DEFAULT) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Check if an element is visible
   * @param {Locator} locator - Playwright locator
   * @returns {Promise<boolean>} True if element is visible
   */
  async isVisible(locator) {
    try {
      return await locator.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get text content of an element
   * @param {Locator} locator - Playwright locator
   * @returns {Promise<string>} Text content of the element
   * @throws {Error} If element not found
   */
  async getText(locator) {
    try {
      return await locator.textContent();
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.PAGE_OBJECT.ELEMENT_NOT_FOUND}: ${error.message}`);
    }
  }

  /**
   * Click an element
   * @param {Locator} locator - Playwright locator
   * @throws {Error} If click fails
   */
  async click(locator) {
    try {
      await locator.click();
    } catch (error) {
      throw new Error(`Click failed: ${error.message}`);
    }
  }

  /**
   * Fill an input field
   * @param {Locator} locator - Playwright locator
   * @param {string} value - Value to fill
   * @throws {Error} If fill fails
   */
  async fill(locator, value) {
    try {
      await locator.fill(value);
    } catch (error) {
      throw new Error(`Fill failed: ${error.message}`);
    }
  }

  /**
   * Clear an input field
   * @param {Locator} locator - Playwright locator
   * @throws {Error} If clear fails
   */
  async clear(locator) {
    try {
      await locator.clear();
    } catch (error) {
      throw new Error(`Clear failed: ${error.message}`);
    }
  }

  /**
   * Wait for an element to be visible
   * @param {Locator} locator - Playwright locator
   * @param {number} timeout - Optional timeout in milliseconds
   */
  async waitForElement(locator, timeout = TIMEOUTS.DEFAULT) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Reload the current page
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Go back to the previous page
   */
  async goBack() {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  /**
   * Take a screenshot
   * @param {string} path - Path where screenshot should be saved
   * @param {boolean} fullPage - Whether to take a full page screenshot
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async takeScreenshot(path, fullPage = true) {
    return await this.page.screenshot({ path, fullPage });
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Check if the page URL matches a pattern
   * @param {string|RegExp} pattern - URL pattern to match
   * @returns {boolean} True if URL matches pattern
   */
  urlMatches(pattern) {
    const currentUrl = this.getCurrentUrl();
    if (pattern instanceof RegExp) {
      return pattern.test(currentUrl);
    }
    return currentUrl.includes(pattern);
  }
}

module.exports = BasePage;
