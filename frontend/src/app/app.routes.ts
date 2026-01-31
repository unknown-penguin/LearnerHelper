import { Routes } from '@angular/router';
import { Dictionary } from './dictionary/dictionary';
import { Settings } from './settings/settings';

export const routes: Routes = [
    {path: 'dictionary', component: Dictionary},
    {path: 'settings', component:Settings},
];
