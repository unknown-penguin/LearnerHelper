import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { BaseHttpService } from '../utils/base-http.service';

interface AuthResponse {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService<User> {
  protected endpoint = 'auth';

  private readonly _user = signal<User | null>(null);
  public readonly isLoggedIn = computed(() => this._user() !== null);
  public readonly user = this._user.asReadonly(); // so user cannot be overriden from outside
  public readonly initialized: Promise<void>;

  constructor(http: HttpClient) {
    super(http);
    this.initialized = this.initializeUser();
  }

  private async initializeUser(): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const { accessToken, user } = await this.request<AuthResponse>().path('/validate').get();
      this._user.set(user);
      localStorage.setItem('accessToken', accessToken);
    } catch {
      this._user.set(null);
      localStorage.removeItem('accessToken');
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { accessToken, user } = await this.request<AuthResponse>()
        .path('/login')
        .body({ email, password })
        .post();
      this._user.set(user);
      localStorage.setItem('accessToken', accessToken);
      return true;
    } catch {
      return false;
    }
  }

  async updateCurrentUser(data: Partial<Pick<User, 'name' | 'email'>>): Promise<boolean> {
    const user = this._user();
    if (!user) return false;
    try {
      const updated = await firstValueFrom(
        this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, data)
      );
      this._user.set(updated);
      return true;
    } catch {
      return false;
    }
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem('accessToken');
  }
}
