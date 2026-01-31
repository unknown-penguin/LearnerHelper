import { Routes } from '@angular/router';
import { Dictionary } from './features/dictionary/pages/dictionary';
import { Settings } from './features/settings/pages/settings';

export const routes: Routes = [
    {path: 'dictionary', component: Dictionary},
    {path: 'settings', component:Settings},
];
