import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Conciertos } from './features/conciertos/conciertos';
import { Teatro } from './features/teatro/teatro';
import { Deportes } from './features/deportes/deportes';
import { Festivales } from './features/festivales/festivales';

export const routes: Routes = [
    { path: 'auth', component: Auth },
    { path: 'auth/login', component: Login },
    { path: 'auth/register', component: Register },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'eventos/conciertos', component: Conciertos },
    { path: 'eventos/teatro', component: Teatro },
    { path: 'eventos/deportes', component: Deportes },
    { path: 'eventos/festivales', component: Festivales },
];
