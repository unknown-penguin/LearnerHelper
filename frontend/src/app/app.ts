import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/layout/sidebar/sidebar';
import { Login } from './features/auth/pages/login';
import { ThemeService } from './core/services/theme.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Login],
  templateUrl: './app.html',
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly userService = inject(UserService);

  version = '1.0.0 alpha';
  readonly user = this.userService.currentUser;
  readonly showLoginModal = signal(false);
}
