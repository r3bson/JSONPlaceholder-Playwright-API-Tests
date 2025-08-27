import {
  toBeValidOnePostGetResponse,
  toBeValidPostsGetResponse,
  toBeValidPostsPostResponse,
  toHaveValidHeaders,
} from '../src/assertions/assertions.api';
import { expect, test } from '../src/merge.fixture';
import dataDrivenPayload from '../src/test-data/data-driven-post-put-payload.json';
import postPayload from '../src/test-data/post-payload.json';

test.describe('Verify /posts API Endpoint', () => {
  let postId: number;

  test.beforeAll('Create a post for futher test usage', async ({ postsRequest }) => {
    const response = await postsRequest.post(postPayload);
    const responseBody = await response.json();
    postId = responseBody.id;
  });

  /* 
  The logic presented above won't work because the API is fake
  and doesn't actually create a new post. Therefore, the returned postId
  will always be 101 - which results in 404 Error for GET cases. 
  To simulate a real-world scenario, I'll use postId of 1 directly in further tests.
  */

  test('TC-posts-01: (GET) Fetch all posts', async ({ postsRequest }) => {
    // Arrange
    const expectedStatusCode = 200;

    // Act
    const response = await postsRequest.get();

    // Assert
    await toHaveValidHeaders(response);
    await toBeValidPostsGetResponse(response, expectedStatusCode);
  });

  test('TC-posts-02: (GET) Fetch particular post ID', async ({ postsRequest }) => {
    const expectedStatusCode = 200;
    const existingPostId = '1';

    const response = await postsRequest.getOne(existingPostId); // Using postId of 1 as explained above

    await toHaveValidHeaders(response);
    await toBeValidOnePostGetResponse(response, expectedStatusCode);
  });

  test('TC-posts-03: (GET) Fetch non-existing post ID', async ({ postsRequest }) => {
    const expectedStatusCode = 404;
    const nonExistingPostId = '9999';

    const response = await postsRequest.getOne(nonExistingPostId);
    const responseBody = await response.json();

    await toHaveValidHeaders(response);
    expect(response.status()).toBe(expectedStatusCode);
    expect(responseBody).toEqual({});
  });

  test('TC-posts-04: (POST) Create a new post', async ({ postsRequest }) => {
    const expectedStatusCode = 201;

    const response = await postsRequest.post(postPayload);

    await toHaveValidHeaders(response);
    await toBeValidPostsPostResponse(response, expectedStatusCode, postPayload);
  });

  test('TC-posts-05: (PUT) Update a non-existing post', async ({ postsRequest }) => {
    const expectedStatusCode = 400;
    const nonExistingPostId = '9999';

    const response = await postsRequest.put(postPayload, nonExistingPostId);

    await toHaveValidHeaders(response);
    expect(response.status()).toBe(expectedStatusCode);
    /* BUG in the implentation of API
       Expected Status Code: 400
       Received Status Code: 500

       What's more - reponse body is containing stack trace of the error
       which is a security issue
    */
  });

  test('TC-posts-06: (DELETE) Delete an existing post', async ({ postsRequest }) => {
    const expectedStatusCode = 204;
    const existingPostId = '1';

    const response = await postsRequest.delete(existingPostId); // Using postId of 1 as explained above
    const responseBody = await response.json();

    await toHaveValidHeaders(response);
    expect(response.status()).toBe(expectedStatusCode);
    /*
      BUG in the implentation of API
      Expected Status Code: 200
      Received Status Code: 204
    */
    expect(responseBody).toEqual({});
  });

  test('TC-posts-07: (PUT) Update existing post with multiple consecutive payloads', async ({ postsRequest }) => {
    const expectedStatusCode = 200;
    const existingPostId = '1';

    for (const payload of dataDrivenPayload) {
      const response = await postsRequest.put(payload, existingPostId);
      const responseBody = await response.json();

      await toHaveValidHeaders(response);
      expect(response.status()).toBe(expectedStatusCode);
      expect(responseBody).toMatchObject({ ...payload });
    }
  });
});
