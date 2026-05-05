import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Navbar implements OnInit {

  isScrolled = false;
  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  cartCount = 0;

  // Simulado — reemplazar con AuthService cuando lo implementes
  isLoggedIn = false;
  userName = 'User';

  navLinks = [
    { label: 'Conciertos', path: '/eventos/conciertos' },
    { label: 'Teatro',     path: '/eventos/teatro' },
    { label: 'Deportes',   path: '/eventos/deportes' },
    { label: 'Festivales', path: '/eventos/festivales' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isUserMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeMenus(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.closeMenus();
    this.router.navigate(['/']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}