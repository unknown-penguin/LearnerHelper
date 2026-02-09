import { Injectable, signal } from '@angular/core';

export interface ThemeOption {
  id: string;
  label: string;
}

const STORAGE_KEY = 'learner-helper-theme';
const DEFAULT_THEME = 'cyan';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  static readonly THEMES: ThemeOption[] = [
    { id: 'cyan',  label: 'Cyan' },
    { id: 'green', label: 'Green' },
    { id: 'medium-gray', label: 'Medium Gray' },
  ];

  readonly themes = ThemeService.THEMES;
  readonly current = signal<string>(this.loadSaved());

  constructor() {
    this.apply(this.current());
  }

  set(themeId: string): void {
    this.current.set(themeId);
    this.apply(themeId);
    localStorage.setItem(STORAGE_KEY, themeId);
  }

  private loadSaved(): string {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME;
  }

  private apply(themeId: string): void {
    const root = document.documentElement;

    for (const t of ThemeService.THEMES) {
      root.classList.remove(`theme-${t.id}`);
    }

    root.classList.add(`theme-${themeId}`);
  }
}
