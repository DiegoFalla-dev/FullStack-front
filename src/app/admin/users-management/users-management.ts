import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'CUSTOMER';
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-management.html',
  styleUrls: ['./users-management.css']
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  currentAdminName = 'Admin Master';
  activeTab: 'usuarios' | 'eventos' = 'usuarios';
  isModalOpen = false;
  modalMode: 'CREATE' | 'EDIT' = 'CREATE';
  selectedUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.users = [
      { id: 1, firstName: 'Admin', lastName: 'Master', email: 'admin@test.com', phone: '555-0001', role: 'ADMIN' },
      { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@test.com', phone: '555-0002', role: 'CUSTOMER' },
      { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com', phone: '555-0003', role: 'CUSTOMER' },
      { id: 4, firstName: 'Luis', lastName: 'Vargas', email: 'luis@test.com', phone: '555-0004', role: 'ADMIN' }
    ];
  }

  goToEvents(): void {
    this.router.navigate(['/admin/events']);
  }

  openModal(mode: 'CREATE' | 'EDIT', user?: User): void {
    this.modalMode = mode;
    this.selectedUser = user || null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }

  saveUser(): void {
    this.closeModal();
  }
}
