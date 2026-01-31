import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

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
