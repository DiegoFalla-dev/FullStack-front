import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';

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

  isLoggedIn = false;
  currentUser: User | null = null;
  userRole: string | null = null;

  navLinks = [
    { label: 'Conciertos', path: '/', queryParams: { category: 'concierto' } },
    { label: 'Teatro',     path: '/', queryParams: { category: 'teatro' } },
    { label: 'Deportes',   path: '/', queryParams: { category: 'deporte' } },
    { label: 'Festivales', path: '/', queryParams: { category: 'festival' } },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    });

    this.authService.currentRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenus();
  }

  goToAdmin() {
    this.router.navigate(['/admin/users']);
    this.closeMenus();
  }

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
}