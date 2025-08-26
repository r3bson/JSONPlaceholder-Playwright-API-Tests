import { requestObjectTest } from './fixtures/request-object.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(requestObjectTest);

export { expect } from '@playwright/test';
