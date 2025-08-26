import { APIResponse } from '@playwright/test';
import { expect } from '../merge.fixture';
import { PostPayload as PostResponse } from '../models/post.api.model';
import { UserPayload as UserResponse } from '../models/user.api.model';

export async function toHaveValidHeaders(response: APIResponse) {
  const headers = await response.headers();
  expect(headers).toMatchObject({
    date: expect.any(String),
    'content-type': expect.stringMatching(/application\/json.*charset=utf-8/),
    'cache-control': expect.any(String),
    pragma: expect.any(String),
    expires: expect.any(String),
    'access-control-allow-credentials': 'true',
  });
}

export async function toBeValidPostsGetResponse(response: APIResponse, expectedStatusCode: number) {
  const responseBody = await response.json();
  expect(response.status()).toBe(expectedStatusCode);
  expect(Array.isArray(responseBody)).toBe(true);

  responseBody.forEach((post: PostResponse) => {
    expect(post).toMatchObject({
      id: expect.any(Number),
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });
}

export async function toBeValidOnePostGetResponse(response: APIResponse, expectedStatusCode: number) {
  const responseBody = await response.json();
  expect(response.status()).toBe(expectedStatusCode);
  expect(responseBody).toMatchObject({
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  });
}

export async function toBeValidPostsPostResponse(
  response: APIResponse,
  expectedStatusCode: number,
  expectedData: PostResponse,
) {
  const responseBody = await response.json();
  expect(response.status()).toBe(expectedStatusCode);

  expect(responseBody).toMatchObject({
    id: expect.any(Number),
    userId: expectedData.userId,
    title: expectedData.title,
    body: expectedData.body,
  });
}

export async function toBeValidUsersGetResponse(response: any, expectedStatusCode: number) {
  const responseBody = await response.json();
  expect(response.status()).toBe(expectedStatusCode);
  expect(Array.isArray(responseBody)).toBe(true);

  responseBody.forEach((user: UserResponse) => {
    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: expect.any(String),
        zipcode: expect.any(String),
        geo: {
          lat: expect.any(String),
          lng: expect.any(String),
        },
      },
      phone: expect.any(String),
      website: expect.any(String),
      company: {
        name: expect.any(String),
        catchPhrase: expect.any(String),
        bs: expect.any(String),
      },
    });
  });
}
export async function toBeValidOneUserGetResponse(response: APIResponse, expectedStatusCode: number) {
  const responseBody = await response.json();
  expect(response.status()).toBe(expectedStatusCode);
  expect(responseBody).toMatchObject({
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  });
}
