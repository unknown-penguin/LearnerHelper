import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/layout/sidebar/sidebar';
import { ThemeService } from './core/services/theme.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly userService = inject(UserService);

  version = '1.0.0 alpha';
  readonly user = this.userService.currentUser;
}
