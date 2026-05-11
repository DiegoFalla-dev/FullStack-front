import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Home } from './features/home/home';
import { EventDetail } from './features/event-detail/event-detail';
import { Festivales } from './features/festivales/festivales';
import { Conciertos } from './features/conciertos/conciertos';
import { Deportes } from './features/deportes/deportes';
import { Teatro } from './features/teatro/teatro';

export const routes: Routes = [
  {
    path: 'admin/users',
    loadComponent: () => import('./admin/users-management/users-management').then(m => m.UsersManagementComponent)
  },
  {
    path: 'admin/events',
    loadComponent: () => import('./admin/events-management/events-management').then(m => m.EventsManagementComponent)
  },
  { path: 'auth', component: Auth },
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'eventos/:id', component: EventDetail },
  { path: 'conciertos', component: Conciertos }, 
  { path: 'teatro', component: Teatro },       
  { path: 'deportes', component: Deportes },      
  { path: 'festivales', component: Festivales },    
  { path: '', component: Home }
];
