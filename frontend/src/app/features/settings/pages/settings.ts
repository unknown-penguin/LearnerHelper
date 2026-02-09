import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html'
})
export class Settings {

  readonly themeService = inject(ThemeService);

  notifications = {
    email: true,
    push: true,
    sms: false,
  };

  privacy = {
    profileVisibility: 'team',
    searchEngineIndexing: false,
  };

  theme = {
    mode: 'system',
    density: 'comfortable',
  };

  toggle<K extends keyof typeof this.notifications>(key: K) {
    this.notifications[key] = !this.notifications[key];
  }

}
