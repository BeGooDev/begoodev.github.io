import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Development } from './pages/development/development';
import { MonCv } from './pages/mon-cv/mon-cv';
import { ContactRedirect } from './pages/contact-redirect/contact-redirect';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'development', component: Development },
    { path: 'mon-cv', component: MonCv },
    { path: 'contact', component: ContactRedirect },
    { path: '**', component: NotFound },
];
