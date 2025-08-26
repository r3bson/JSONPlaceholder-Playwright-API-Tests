import { PostPayload } from '../models/post.api.model';
import { Headers } from '../models/headers.api.model';
import { BaseRequest } from '../requests/base.request';
import { apiUrls } from '../utils/api.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class PostsRequest extends BaseRequest {
  constructor(
    protected request: APIRequestContext,
    protected headers?: Headers,
  ) {
    super(request, apiUrls.postsUrl, headers);
  }

  async getOne(PostId: string): Promise<APIResponse> {
    return await this.request.get(`${this.url}/${PostId}`, {
      headers: this.headers,
    });
  }

  async post(data: PostPayload): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers: this.headers,
      data,
    });
  }

  async put(data: PostPayload, PostId: string): Promise<APIResponse> {
    return await this.request.put(`${this.url}/${PostId}`, {
      headers: this.headers,
      data,
    });
  }

  async patch(
    data: Partial<PostPayload>,
    PostId: string,
  ): Promise<APIResponse> {
    return await this.request.patch(`${this.url}/${PostId}`, {
      headers: this.headers,
      data,
    });
  }

  async delete(PostId: string): Promise<APIResponse> {
    return await this.request.delete(`${this.url}/${PostId}`, {
      headers: this.headers,
    });
  }
}
