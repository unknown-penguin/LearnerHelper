import { Routes } from '@angular/router';
import { Dictionary } from './features/dictionary/pages/dictionary';
import { Settings } from './features/settings/pages/settings';
import { Languages } from './features/languages/pages/languages';
import { ManageDictionaries } from './features/manage-dictionaries/pages/manage-dictionaries';

export const routes: Routes = [
    {path: 'dictionary', component: Dictionary},
    {path: 'manage-dictionaries', component: ManageDictionaries},
    {path: 'languages', component: Languages},
    {path: 'settings', component: Settings},
];
