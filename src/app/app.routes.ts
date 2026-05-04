import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/users',
    loadComponent: () => import('./admin/users-management/users-management').then(m => m.UsersManagementComponent)
  },
  {
    path: 'admin/events',
    loadComponent: () => import('./admin/events-management/events-management').then(m => m.EventsManagementComponent)
  }
];
