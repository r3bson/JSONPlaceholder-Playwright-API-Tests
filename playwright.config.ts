import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    actionTimeout: 0,
    trace: 'on',
  },

  projects: [
    {
      name: 'API Tests',
      testDir: 'tests',
      testMatch: ['**/*.spec.ts'],
    },
  ],
});
