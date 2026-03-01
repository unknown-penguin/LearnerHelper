import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../utils/base-http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService<User> {
  protected endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  public getUserById(id: string): Promise<User> {
    return this.request<User>().path(`/${id}`).get();
  }
}
