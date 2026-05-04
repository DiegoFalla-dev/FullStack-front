import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Footer {

  currentYear = new Date().getFullYear();

  links = [
    {
      title: 'Descubrir',
      items: [
        { label: 'Conciertos',  path: '/events', query: { category: 'conciertos' } },
        { label: 'Teatro',      path: '/events', query: { category: 'teatro' } },
        { label: 'Deportes',    path: '/events', query: { category: 'deportes' } },
        { label: 'Festivales',  path: '/events', query: { category: 'festivales' } },
        { label: 'Stand Up',    path: '/events', query: { category: 'stand-up' } },
      ]
    },
    {
      title: 'Tu cuenta',
      items: [
        { label: 'Iniciar sesión',  path: '/login',            query: {} },
        { label: 'Registrarse',     path: '/register',         query: {} },
        { label: 'Mis entradas',    path: '/profile/orders',   query: {} },
        { label: 'Mi perfil',       path: '/profile',          query: {} },
      ]
    },
    {
      title: 'Ayuda',
      items: [
        { label: 'Preguntas frecuentes', path: '/faq',      query: {} },
        { label: 'Términos de uso',      path: '/terms',    query: {} },
        { label: 'Política de privacidad', path: '/privacy', query: {} },
        { label: 'Contacto',             path: '/contact',  query: {} },
      ]
    }
  ];

  socials = [
    {
      label: 'Facebook',
      url: 'https://facebook.com',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
    },
    {
      label: 'Twitter / X',
      url: 'https://twitter.com',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    {
      label: 'TikTok',
      url: 'https://tiktok.com',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>`
    }
  ];
}