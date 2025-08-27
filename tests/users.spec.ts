import {
  toBeValidOneUserGetResponse,
  toBeValidUsersGetResponse,
  toHaveValidHeaders,
} from '../src/assertions/assertions.api';
import { createRandomUser } from '../src/factories/user.factory';
import { expect, test } from '../src/merge.fixture';
import { UserPayload } from '../src/models/user.api.model';
import incompleteUserPayload from '../src/test-data/incomplete-user-payload.json';

test.describe('Verify /users API Endpoint', () => {
  let userId: number;
  let userPayload: UserPayload;

  test.beforeAll('Create a user for futher test usage', async ({ usersRequest }) => {
    userPayload = createRandomUser();
    const response = await usersRequest.post(userPayload);
    const responseBody = await response.json();
    userId = responseBody.id;
  });

  /* 
  The logic presented above won't work because the API is fake
  and doesn't actually create a new user. Therefore, the returned userId
  will always be 11 - which results in 404 Error for GET cases. 
  To simulate a real-world scenario, I'll use userId of 1 directly in further tests.
  */

  test('TC-users-01: (GET) Fetch all users', async ({ usersRequest }) => {
    // Arrange
    const expectedStatusCode = 200;

    // Act
    const response = await usersRequest.get();

    // Assert
    await toHaveValidHeaders(response);
    await toBeValidUsersGetResponse(response, expectedStatusCode);
  });

  test('TC-users-02: (GET) Fetch particular user ID', async ({ usersRequest }) => {
    const expectedStatusCode = 200;

    const response = await usersRequest.getOne('1'); // Using userId of 1 as explained above

    await toHaveValidHeaders(response);
    await toBeValidOneUserGetResponse(response, expectedStatusCode);
  });

  test('TC-users-03: (GET) Fetch non-existing user ID', async ({ usersRequest }) => {
    const expectedStatusCode = 404;

    const response = await usersRequest.getOne('9999');
    const responseBody = await response.json();

    await toHaveValidHeaders(response);
    expect(response.status()).toBe(expectedStatusCode);
    expect(responseBody).toEqual({});
  });

  test('TC-users-04: (POST) Create a new user with incomplete payload', async ({ usersRequest }) => {
    const expectedStatusCode = 400;

    const response = await usersRequest.post(incompleteUserPayload as any);

    expect(response.status()).toBe(expectedStatusCode);
    /*
      BUG in the implentation of API
      Expected Status Code: 400
      Received Status Code: 201
    */
    await toHaveValidHeaders(response);
    // Normally would add assertion for error message in response body,
    // but the fake API doesn't return any
  });
});
