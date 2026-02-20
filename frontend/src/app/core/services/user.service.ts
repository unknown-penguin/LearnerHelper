import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../utils/base-http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService<User> {
  protected endpoint = 'users';
  private readonly loggedUser = signal<User | null>(null);
  public isLoggedIn = computed(() => this.loggedUser() !== null);
  public readonly currentUser = this.loggedUser.asReadonly();

  constructor(http: HttpClient) {
    super(http);
    this.initializeUser();
  }

  private async initializeUser(): Promise<void> {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        const user = await this.request<User>()
          .path(`/${parsed.id}`)
          .get();
        this.loggedUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } catch {
        this.loggedUser.set(null);
        localStorage.removeItem('currentUser');
      }
    }
  }

  async loginUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.request<User>()
        .path('/login')
        .params({ email, password })
        .get();
      this.loggedUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async updateCurrentUser(data: Partial<Pick<User, 'name' | 'email'>>): Promise<boolean> {
    const user = this.loggedUser();
    if (!user) return false;
    try {
      const updated = await this.request<User>().path(`/${user.id}`).body(data).put();
      this.loggedUser.set(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Update failed:', error);
      return false;
    }
  }

  logoutUser(): void {
    this.loggedUser.set(null);
    localStorage.removeItem('currentUser');
  }
}
