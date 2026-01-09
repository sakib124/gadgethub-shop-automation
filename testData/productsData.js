/**
 * Test data for Gadget Hub products page
 * Contains product information and expected values
 */

const products = {
  headphones: {
    name: 'Wireless Bluetooth Headphones',
    price: '$79.99',
    description: 'Premium noise-cancelling headphones with 30-hour battery life. Perfect for music lovers and professionals who demand crystal-clear audio quality.'
  },
  
  watch: {
    name: 'Smart Fitness Watch',
    price: '$149.99',
    description: 'Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and waterproof design for all activities.'
  },
  
  keyboard: {
    name: 'Mechanical Keyboard',
    price: '$89.99',
    description: 'RGB backlit mechanical gaming keyboard with customizable keys. Built for gamers and programmers who want tactile precision and style.'
  },
  
  powerBank: {
    name: 'Portable Power Bank',
    price: '$29.99',
    description: '20000mAh high-capacity portable charger with fast charging technology. Never run out of battery when you\'re on the go.'
  },
  
  usbHub: {
    name: 'USB-C Hub Adapter',
    price: '$49.99',
    description: '7-in-1 multiport adapter with HDMI, USB 3.0, SD card reader, and more. Essential accessory for modern laptops and tablets.'
  },
  
  mouse: {
    name: 'Wireless Mouse',
    price: '$19.99',
    description: 'Ergonomic wireless mouse with adjustable DPI and silent clicking. Designed for comfort during long work sessions.'
  }
};

const sortOptions = {
  nameAsc: 'Name (A to Z)',
  nameDesc: 'Name (Z to A)',
  priceLowHigh: 'Price (Low to High)',
  priceHighLow: 'Price (High to Low)'
};

const expectedProductOrder = {
  nameAsc: [
    'Mechanical Keyboard',
    'Portable Power Bank',
    'Smart Fitness Watch',
    'USB-C Hub Adapter',
    'Wireless Bluetooth Headphones',
    'Wireless Mouse'
  ],
  nameDesc: [
    'Wireless Mouse',
    'Wireless Bluetooth Headphones',
    'USB-C Hub Adapter',
    'Smart Fitness Watch',
    'Portable Power Bank',
    'Mechanical Keyboard'
  ],
  priceLowHigh: [19.99, 29.99, 49.99, 79.99, 89.99, 149.99],
  priceHighLow: [149.99, 89.99, 79.99, 49.99, 29.99, 19.99]
};

const buttonStates = {
  add: 'ADD TO CART',
  remove: 'REMOVE'
};

const menuLinks = {
  allItems: 'All Items',
  about: 'About',
  logout: 'Logout',
  resetApp: 'Reset App State'
};

module.exports = {
  products,
  sortOptions,
  expectedProductOrder,
  buttonStates,
  menuLinks
};
