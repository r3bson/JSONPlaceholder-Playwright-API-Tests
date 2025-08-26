# API Testing Framework with Playwright

Automated API testing framework for JSONPlaceholder API using Playwright.

## Installation

### Prerequisites

- Node.js (v16.3.0 or higher)
- npm (v8.0.0 or higher)
- macOS/Linux/Windows

### Dependencies Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/HomeAssignmentAPITests.git

# Navigate to project directory
cd HomeAssignmentAPITests

# Install dependencies
npm install

#Install Playwright
npx playwright install
```

## Running Tests

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

## Assumptions & Notes

1. Testing Environment
   - Tests run against JSONPlaceholder API (https://jsonplaceholder.typicode.com)
   - No authentication required
   - API is publicly accessible

2. Test Design
   - Test cases are designed using Arrange, Act, Assert (AAA) pattern
   - Tests are independent and can run in parallel
   - DRY (Don't Repeat Yourself) principle makes the framework more maintainable
   - Response schemas, status codes and headers are verified for all test case
   - Response body contents are verified for certain test cases

## Limitations & Known Issues

1. API Limitations
   - JSONPlaceholder is a fake API - resources (POST/PUT/PATCH/DELETE) are not updated on the server
   - POST method always returns ids which are not supported for further GET requests, e.g. id: 101

2. Framework Limitations
   - No support for authentication (not needed for this API)
   - No environment switching capability
   - No external test-reporter supported (overengineering for this assignment)

3. Known Bugs
   - PUT request to non-existing resource returns 500 instead of 404
   - Error responses expose stack traces (that also influences on response header content-type)
   - DELETE response status code inconsistency (204 vs 200)
   - POST with incomplete User payload results in 200 (should be 400 with error message)

## Project Structure

```
HomeAssignmentAPITests/
├── src/
│   ├── assertions/        # Custom assertions logic
│   ├── factories/         # Test data factories
│   ├── fixtures/          # Abstracts request setup logic from test files
│   ├── models/            # Interfaces for request payload structure
│   ├── requests/          # Classes that handle common HTTP request functionality
│   ├── test-data/         # Test data static files such as payloads
│   ├── utils/             # Utilities, endpoint paths definition
│   └── merge.fixture.ts   # Central configuration and merging point for Playwright Test Fixtures
├── tests/
│   └── posts.spec.ts      # API test cases
└── docs/
    └── test-cases.md      # Test documentation
```

## Test Report

- Sample console report [docs/sample-report.png](docs/sample-report.png)
