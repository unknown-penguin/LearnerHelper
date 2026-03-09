import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelect, SelectOption } from '../../../core/components/custom-select/custom-select';
import { ThemeService } from '../../../core/services/theme.service';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { SettingsService } from '../../../core/services/settings.service';
import { AuthService } from '../../../core/services/auth.service';
import { UpdateUserSettings, UserSettings } from '../../../core/models/settings.model';

const LANG_STORAGE_KEY = 'learner-helper-lang';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, CustomSelect, TranslocoDirective],
  templateUrl: './settings.html',
  providers: [provideTranslocoScope('settings')]
})
export class Settings implements OnInit {

  readonly themeService = inject(ThemeService);
  readonly translocoService = inject(TranslocoService);
  readonly settingsService = inject(SettingsService);
  readonly authService = inject(AuthService);

  private settingsId: string | null = null;

  saving = signal(false);
  saved = signal(false);
  error = signal<string | null>(null);

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
    mode: 'cyan',
    density: 'comfortable',
  };

  async ngOnInit(): Promise<void> {
    await this.authService.initialized;

    const user = this.authService.user();
    if (!user) {
      return;
    }

    try {
      const settings = await this.settingsService.getByUserId(user.id);
      this.settingsId = settings.id;
      this.applySettings(settings);
    } catch {
      // Keep local defaults if server settings are unavailable.
    }
  }

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

  setTheme(themeId: string): void {
    this.theme.mode = themeId;
    this.themeService.set(themeId);
  }


  private applySettings(settings: UserSettings): void {
    this.notifications.email = settings.emailNotifications;
    this.notifications.push = settings.pushNotifications;
    this.notifications.sms = settings.smsNotifications;
    this.privacy.profileVisibility = settings.profileVisibility;
    this.privacy.searchEngineIndexing = settings.searchEngineIndexing;
    this.theme.mode = settings.theme;
    this.theme.density = settings.density;
    this.themeService.set(settings.theme);
    this.translocoService.setActiveLang(settings.language);
    localStorage.setItem(LANG_STORAGE_KEY, settings.language);
  }

  async save(): Promise<void> {
    if (!this.settingsId) {
      return;
    }

    this.saving.set(true);
    this.saved.set(false);
    this.error.set(null);

    try {
      await this.persistSettings();
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 3000);
    } catch {
      this.error.set(this.translocoService.translate('settings.saveError'));
    } finally {
      this.saving.set(false);
    }
  }

  private persistSettings(): Promise<UserSettings> {
    if (!this.settingsId) {
      return Promise.reject(new Error('Settings id missing'));
    }

    const payload: UpdateUserSettings = {
      emailNotifications: this.notifications.email,
      pushNotifications: this.notifications.push,
      smsNotifications: this.notifications.sms,
      profileVisibility: this.privacy.profileVisibility as UpdateUserSettings['profileVisibility'],
      searchEngineIndexing: this.privacy.searchEngineIndexing,
      theme: this.theme.mode,
      density: this.theme.density as UpdateUserSettings['density'],
      language: this.interfaceLanguage as UpdateUserSettings['language'],
    };

    return this.settingsService.updateSettings(this.settingsId, payload);
  }

}
