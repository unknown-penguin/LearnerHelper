import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelect, SelectOption } from '../../../core/components/custom-select/custom-select';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, CustomSelect],
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

  readonly profileVisibilityOptions: SelectOption[] = [
    { value: 'public', label: 'Public' },
    { value: 'team', label: 'Team' },
    { value: 'private', label: 'Only me' },
  ];

  readonly densityOptions: SelectOption[] = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
    { value: 'cozy', label: 'Cozy' },
  ];

  get themeOptions(): SelectOption[] {
    return this.themeService.themes.map(t => ({ value: t.id, label: t.label }));
  }

  toggle<K extends keyof typeof this.notifications>(key: K) {
    this.notifications[key] = !this.notifications[key];
  }

}
