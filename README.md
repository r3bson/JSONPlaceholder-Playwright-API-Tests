# 🎭 API Testing Framework with Playwright

Automated API testing framework for JSONPlaceholder using Playwright.

## 📦 Installation

### ✅ Prerequisites

- Node.js (v16.3.0 or higher)
- npm (v8.0.0 or higher)
- macOS/Linux/Windows

### 🔧 Dependencies Installation

```bash
# Clone the repository
git clone https://github.com/r3bson/JSONPlaceholder-Playwright-API-Tests

# Navigate to project home directory
cd JSONPlaceholder-Playwright-API-Tests

# Install dependencies
npm install

#Install Playwright
npx playwright install
```

## ▶️ Running Tests

### All Tests

```bash
npm test
```

### Specific Test File

```bash
npx playwright test posts.spec.ts
```

### With HTML Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

## 🧭 Assumptions & Notes

1. Testing Environment
   - Targets: https://jsonplaceholder.typicode.com
   - No authentication required
   - API is publicly accessible

2. Test Design
   - AAA pattern (Arrange → Act → Assert)
   - Tests are independent and can run in parallel
   - DRY utils/fixtures for maintainability
   - Status codes and headers are verified for all test case
   - Response body contents are verified for certain test cases

3. Covered Test Cases Overview
- 📚 [docs/test-cases.md](docs/test-cases.md)

## ⚠️ Limitations & Known Issues

1. API Limitations
   - JSONPlaceholder is a fake API - resources (POST/PUT/PATCH/DELETE) are not updated on the server
   - POST returns synthetic IDs (e.g. id: 101) which are not supported for further GET requests

2. Framework Limitations
   - No support for authentication (not needed for this API)
   - No environment switching capability
   - No external test-reporter supported (overengineering for this assignment)

3. Known Bugs
   - PUT request to non-existing resource returns 500 instead of 404
   - Error responses expose stack traces (that also influences on response header content-type)
   - DELETE response status code inconsistency (204 vs 200)
   - POST with incomplete User payload results in 200 (should be 400 with error message)

## 🗂️ Project Structure

```
JSONPlaceholder-Playwright-API-Tests/
├── src/
│   ├── assertions/        # Separated assertions logic
│   ├── factories/         # Test data factories
│   ├── fixtures/          # Abstracts request setup logic from test files
│   ├── models/            # Interfaces for request payload structure
│   ├── requests/          # Classes that handle common HTTP request functionality
│   ├── test-data/         # Test data static files such as payloads
│   ├── utils/             # Utilities, endpoint paths definition
│   └── merge.fixture.ts   # Central configuration and merging point for Playwright Test Fixtures
├── tests/
│   ├── posts.spec.ts      # API test cases
│   └── users.spec.ts
└── docs/
    └── test-cases.md      # Test documentation
```

## 📑 Test Report

- Sample console report [docs/sample-report.png](docs/sample-report.png)
