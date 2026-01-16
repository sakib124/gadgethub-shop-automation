# Gadget Hub Test Automation Framework

A comprehensive test automation framework for Gadget Hub using **Cucumber BDD**, **Playwright**, **Page Object Model**, and **API Testing**. Supports both UI testing and API endpoint validation.

<img width="1919" height="909" alt="automation-results" src="https://github.com/user-attachments/assets/d8635dfe-0018-4684-b2c7-bd806ede199e" />

<img width="1259" height="905" alt="gadgethub" src="https://github.com/user-attachments/assets/528f6285-1114-49ec-816a-aa3d15c70eca" />

## 🏗️ Project Structure

```
gadgethub-automation/
├── config/
│   └── constants.js           # Centralized configuration
├── features/                   # Gherkin feature files (BDD)
│   ├── login.feature          # Login scenarios
│   └── products.feature       # Products scenarios
├── step-definitions/          # Cucumber step implementations
│   ├── hooks.js              # Before/After hooks
│   ├── login.steps.js        # Login step definitions
│   └── products.steps.js     # Products step definitions
├── pages/                     # Page Object Model
│   ├── LoginPage.js          # Login page object
│   └── ProductsPage.js       # Products page object
├── tests/                     # Test files
│   ├── login.spec.js         # UI Login test suite
│   └── api/
│       └── api.spec.js       # API test suite
├── api-mock/                  # Mock API Server
│   ├── server.js             # Express server
│   ├── db.json               # Mock database
│   └── README.md             # API documentation
├── testData/                  # Test data files
│   ├── loginData.js          # Login test data
│   └── productsData.js       # Products test data
├── screenshots/               # Test failure screenshots (git ignored)
├── playwright-report/         # Playwright HTML reports (git ignored)
├── cucumber.js                # Cucumber configuration
├── playwright.config.js       # Playwright configuration
├── generate-report.js         # Cucumber report generator
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## ✨ Features

- **🥒 BDD with Cucumber** - Business-readable Gherkin scenarios
- **🎭 Playwright** - Fast, reliable cross-browser automation
- **📄 Page Object Model** - Maintainable, scalable test architecture
- **🔌 API Testing** - Direct endpoint validation with mock server
- **🔧 Centralized Configuration** - Single source of truth for URLs, selectors, credentials
- **⚡ Dual Framework Support** - Run Cucumber BDD or Playwright specs
- **📊 HTML Reports** - Visual test results with screenshots on failure

## 🧪 Test Coverage

### ✅ UI Testing
**Login Scenarios:**
- Valid credentials (default, problem, delayed, cart_failure users)
- Locked out user validation
- Invalid credentials (username, password, empty fields)
- UI element validation (inputs, buttons, placeholders)
- Error message handling (display, close)

**Products Scenarios:**
- Product listing and visibility
- Add/remove products from cart
- Cart count validation
- Sorting functionality
- Navigation and logout

### ✅ API Testing
**Endpoints Covered:**
- **POST** `/api/auth/login` - Authentication (multiple users)
- **POST** `/api/auth/logout` - Session termination
- **GET** `/api/products` - Retrieve all products
- **GET** `/api/products/:id` - Retrieve specific product

**Test Users:**
- `default_user` / `welcome_123`
- `image_error_user` / `welcome_123`
- `delayed_login_user` / `welcome_123`
- `cart_failure_user` / `welcome_123`
- `account_locked_user` / `welcome_123` (should fail with 403)

## 🚀 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git** (for version control)

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd gadgethub-automation
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npm run install:browsers
```

## 🎯 Running Tests

### Cucumber BDD Tests (UI):

```bash
# Run all Cucumber scenarios
npm test

# Run in parallel (2 workers)
npm run test:parallel

# Generate and view report
npm run report

# Run specific tag
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@regression"
```

### Playwright Spec Tests (UI):

```bash
# Run all Playwright tests
npm run test:playwright

# Run specific test file
npx playwright test tests/login.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# View Playwright report
npx playwright show-report
```

### API Tests:

**Step 1: Start the Mock API Server** (in one terminal)
```bash
npm run api:start
```
Server will run on `http://localhost:3000`

**Step 2: Run API Tests** (in another terminal)
```bash
# Run all API tests
npm run test:api

# View API test report
npx playwright show-report
```

**Available API Endpoints:**
- `POST http://localhost:3000/api/auth/login`
- `POST http://localhost:3000/api/auth/logout`
- `GET http://localhost:3000/api/products`
- `GET http://localhost:3000/api/products/:id`

## 📝 Configuration

### Centralized Constants ([config/constants.js](config/constants.js))
- **URLs** - BASE_URL, LOGIN_PAGE, PRODUCTS_PAGE
- **Timeouts** - DEFAULT, CART_UPDATE
- **Selectors** - LOGIN, PRODUCTS
- **Credentials** - Test users and passwords
- **Error Messages** - Expected validation messages
- **Browser Config** - Headless mode, args, viewport

### Playwright Config ([playwright.config.js](playwright.config.js))
- Browser: Chrome (maximized)
- Headless: false
- Screenshots: on failure
- Videos: on failure
- Timeouts: 10s test, 5s expect

## 📊 Reports

### Cucumber Reports:
- **HTML Report**: `cucumber-report.html` (auto-generated after test run)
- **JSON Report**: `cucumber-report.json`
- **Screenshots**: Captured on failure in `screenshots/`

### Playwright Reports:
- **HTML Report**: `playwright-report/index.html`
- View with: `npx playwright show-report`

## 🔧 Writing New Tests

### BDD Cucumber Scenario:

1. **Add scenario to feature file** (`features/*.feature`):
```gherkin
@login @smoke
Scenario: Successful login
  Given I am on the Gadget Hub login page
  When I login with username "default_user" and password "welcome_123"
  Then I should be redirected to the products page
```

2. **Implement step definitions** (if new steps needed)
3. **Update page objects** (if new elements needed)

### Playwright Spec Test:

1. **Create test file** in `tests/` directory
2. **Import page objects** and test data
3. **Write test scenarios** using Playwright syntax

