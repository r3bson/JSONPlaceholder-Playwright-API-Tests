import { test as baseTest } from '@playwright/test';
import { PostsRequest } from '../requests/posts.request';
import { UsersRequest } from '../requests/users.request';

interface Requests {
  postsRequest: PostsRequest;
  usersRequest: UsersRequest;
}

export const requestObjectTest = baseTest.extend<Requests>({
  postsRequest: async ({ request }, use) => {
    const postsRequest = new PostsRequest(request);
    await use(postsRequest);
  },
  usersRequest: async ({ request }, use) => {
    const usersRequest = new UsersRequest(request);
    await use(usersRequest);
  },
});
