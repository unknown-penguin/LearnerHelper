import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

const LANG_STORAGE_KEY = 'learner-helper-lang';
const AVAILABLE_LANGS = ['en', 'es', 'bg'];

function getSavedLang(): string {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  return saved && AVAILABLE_LANGS.includes(saved) ? saved : 'en';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideTransloco({
        config: { 
          availableLangs: AVAILABLE_LANGS,
          defaultLang: getSavedLang(),
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ]
};
