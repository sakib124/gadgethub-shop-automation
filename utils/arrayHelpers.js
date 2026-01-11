/**
 * Array utility functions for sorting validation
 */
class ArrayHelpers {
  /**
   * Verify arrays are sorted alphabetically
   * @param {string[]} array - Array to check
   * @param {boolean} ascending - True for ascending, false for descending
   * @returns {boolean} True if sorted correctly
   */
  static isArraySortedAlphabetically(array, ascending = true) {
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
  static isArraySortedNumerically(array, ascending = true) {
    for (let i = 0; i < array.length - 1; i++) {
      if (ascending && array[i] > array[i + 1]) return false;
      if (!ascending && array[i] < array[i + 1]) return false;
    }
    return true;
  }
}

module.exports = ArrayHelpers;
