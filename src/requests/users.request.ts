import { APIRequestContext, APIResponse } from '@playwright/test';
import { Headers } from '../models/headers.api.model';
import { BaseRequest } from '../requests/base.request';
import { apiUrls } from '../utils/api.util';
import { UserPayload } from '../models/user.api.model';

export class UsersRequest extends BaseRequest {
  constructor(
    protected request: APIRequestContext,
    protected headers?: Headers,
  ) {
    super(request, apiUrls.usersUrl, headers);
  }

  async getOne(UserId: string): Promise<APIResponse> {
    return await this.request.get(`${this.url}/${UserId}`, {
      headers: this.headers,
    });
  }

  async post(data: UserPayload): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers: this.headers,
      data,
    });
  }

  async put(data: UserPayload, UserId: string): Promise<APIResponse> {
    return await this.request.put(`${this.url}/${UserId}`, {
      headers: this.headers,
      data,
    });
  }

  async patch(data: Partial<UserPayload>, UserId: string): Promise<APIResponse> {
    return await this.request.patch(`${this.url}/${UserId}`, {
      headers: this.headers,
      data,
    });
  }

  async delete(UserId: string): Promise<APIResponse> {
    return await this.request.delete(`${this.url}/${UserId}`, {
      headers: this.headers,
    });
  }
}
