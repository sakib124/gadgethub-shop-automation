/**
 * API Tests for Gadget Hub
 * Tests for login, logout, and product retrieval
 */

const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'http://localhost:3000/api';

// POST Tests - Authentication
test.describe('POST - Login/Logout API Tests', () => {
  
  test('POST - Login with default user', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'default_user',
        password: 'welcome_123'
      }
    });

    const body = await response.json();
    console.log('Login Response:', body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('user');
    expect(body.user.username).toBe('default_user');
  });

  test('POST - Login with image error user', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'image_error_user',
        password: 'welcome_123'
      }
    });

    const body = await response.json();
    console.log('Image Error User Login Response:', body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('token');
    expect(body.user.username).toBe('image_error_user');
  });

  test('POST - Login with delayed login user', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'delayed_login_user',
        password: 'welcome_123'
      }
    });

    const body = await response.json();
    console.log('Delayed Login User Response:', body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('token');
    expect(body.user.username).toBe('delayed_login_user');
  });

  test('POST - Login with cart failure user', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'cart_failure_user',
        password: 'welcome_123'
      }
    });

    const body = await response.json();
    console.log('Cart Failure User Login Response:', body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('token');
    expect(body.user.username).toBe('cart_failure_user');
  });

  test('POST - Login fails with locked out user', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'account_locked_user',
        password: 'welcome_123'
      }
    });

    const body = await response.json();
    console.log('Locked User Response:', body);

    expect(response.status()).toBe(403);
    expect(body).toHaveProperty('error');
    expect(body.error).toContain('locked out');
  });

  test('POST - Login fails with invalid credentials', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'invalid_user',
        password: 'wrong_password'
      }
    });

    const body = await response.json();
    console.log('Invalid Credentials Response:', body);

    expect(response.status()).toBe(401);
    expect(body).toHaveProperty('error');
  });

  test('POST - Logout successfully', async ({ request }) => {
    // First login
    const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: 'default_user',
        password: 'welcome_123'
      }
    });

    const { token } = await loginResponse.json();

    // Then logout
    const logoutResponse = await request.post(`${API_BASE_URL}/auth/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const body = await logoutResponse.json();
    console.log('Logout Response:', body);

    expect(logoutResponse.status()).toBe(200);
    expect(body.message).toBe('Logged out successfully');
  });
});

// GET Tests - Retrieve Products
test.describe('GET - All Products API Tests', () => {
  
  test('GET - Retrieve all products', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products`);

    const products = await response.json();
    console.log('Get All Products Response:', JSON.stringify(products, null, 2));

    expect(response.status()).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');
  });
});

test.describe('GET - Product by ID API Tests', () => {
  
  test('GET product by valid ID', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products/1`);

    const product = await response.json();
    console.log('Get Product by ID Response:', product);

    expect(response.status()).toBe(200);
    expect(product).toHaveProperty('id');
    expect(product.id).toBe(1);
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product.name).toBe('Wireless Bluetooth Headphones');
  });

  test('GET product with invalid ID returns 404', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products/99999`);

    const body = await response.json();
    console.log('Invalid Product ID Response:', body);

    expect(response.status()).toBe(404);
    expect(body.error).toContain('Product not found');
  });
});
