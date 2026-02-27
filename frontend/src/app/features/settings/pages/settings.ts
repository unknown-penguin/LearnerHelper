import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelect, SelectOption } from '../../../core/components/custom-select/custom-select';
import { ThemeService } from '../../../core/services/theme.service';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';

const LANG_STORAGE_KEY = 'learner-helper-lang';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, CustomSelect, TranslocoDirective],
  templateUrl: './settings.html',
  providers: [provideTranslocoScope('settings')]
})
export class Settings {

  readonly themeService = inject(ThemeService);
  readonly translocoService = inject(TranslocoService);

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

  get interfaceLanguage() {
    return this.translocoService.getActiveLang();
  }

  set interfaceLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }

  get profileVisibilityOptions(): SelectOption[] {
    return [
      { value: 'public', label: this.translocoService.translate('settings.options.visibility.public') },
      { value: 'team', label: this.translocoService.translate('settings.options.visibility.team') },
      { value: 'private', label: this.translocoService.translate('settings.options.visibility.private') },
    ];
  }

  get densityOptions(): SelectOption[] {
    return [
      { value: 'comfortable', label: this.translocoService.translate('settings.options.density.comfortable') },
      { value: 'compact', label: this.translocoService.translate('settings.options.density.compact') },
      { value: 'cozy', label: this.translocoService.translate('settings.options.density.cozy') },
    ];
  }

  get languageOptions(): SelectOption[] {
    return [
      { value: 'en', label: this.translocoService.translate('settings.options.language.en') },
      { value: 'es', label: this.translocoService.translate('settings.options.language.es') },
      { value: 'bg', label: this.translocoService.translate('settings.options.language.bg') },
    ];
  }

  get themeOptions(): SelectOption[] {
    return this.themeService.themes.map(t => ({
      value: t.id,
      label: this.translocoService.translate(`settings.options.theme.${t.id}`),
    }));
  }

  toggle<K extends keyof typeof this.notifications>(key: K) {
    this.notifications[key] = !this.notifications[key];
  }

}
