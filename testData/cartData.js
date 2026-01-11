module.exports = {
  // Default items to add to cart for testing
  defaultCartItems: [
    'Wireless Bluetooth Headphones',
    'Smart Fitness Watch'
  ],

  // Multiple items for testing
  multipleItems: [
    'Wireless Bluetooth Headphones',
    'Smart Fitness Watch',
    'Portable Power Bank',
    'Mechanical Keyboard'
  ],

  // Items with their expected prices (for default cart items)
  itemsWithPrices: [
    {
      name: 'Wireless Bluetooth Headphones',
      price: '$79.99'
    },
    {
      name: 'Smart Fitness Watch',
      price: '$149.99'
    }
  ],

  // All available items with prices
  allItemsWithPrices: [
    {
      name: 'Wireless Bluetooth Headphones',
      price: '$79.99'
    },
    {
      name: 'Smart Fitness Watch',
      price: '$149.99'
    },
    {
      name: 'Mechanical Keyboard',
      price: '$89.99'
    },
    {
      name: 'Portable Power Bank',
      price: '$34.99'
    },
    {
      name: 'USB-C Hub Adapter',
      price: '$45.99'
    },
    {
      name: 'Wireless Mouse',
      price: '$29.99'
    }
  ],

  // Single item for testing
  singleItem: 'Wireless Bluetooth Headphones',

  // Expected cart badge counts
  cartBadgeCounts: {
    empty: 0,
    single: 1,
    double: 2,
    multiple: 4
  }
};
