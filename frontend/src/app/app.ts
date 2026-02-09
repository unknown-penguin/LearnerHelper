import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/layout/sidebar/sidebar';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
})
export class App {
  private readonly theme = inject(ThemeService);   // ensure theme is applied on startup
  protected readonly title = signal('frontend');
  user = { name: 'The Creator' };
  version = '1.0.0 alpha';
}
