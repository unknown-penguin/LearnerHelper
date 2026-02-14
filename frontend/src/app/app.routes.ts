import { Routes } from '@angular/router';
import { Dictionary } from './features/dictionary/pages/dictionary';
import { Settings } from './features/settings/pages/settings';
import { Languages } from './features/languages/pages/languages';
import { ManageDictionaries } from './features/manage-dictionaries/pages/manage-dictionaries';
import { QuizSetup } from './features/quiz/pages/quiz-setup';
import { Quiz } from './features/quiz/pages/quiz';
import { QuizResults } from './features/quiz/pages/quiz-results';

export const routes: Routes = [
    {path: 'dictionary', component: Dictionary},
    {path: 'quiz-setup', component: QuizSetup},
    {path: 'quiz/:id', component: Quiz},
    {path: 'quiz-results', component: QuizResults},
    {path: 'manage-dictionaries', component: ManageDictionaries},
    {path: 'languages', component: Languages},
    {path: 'settings', component: Settings},
];
