import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CUSTOMER';
  passwordMasked: string;
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
  isModalOpen = false;
  modalMode: 'CREATE' | 'EDIT' = 'CREATE';
  selectedUser: User | null = null;

  ngOnInit(): void {
    // Mock data for UI demonstration
    this.users = [
      { id: 1, dni: '72345678', firstName: 'Admin', lastName: 'Master', role: 'ADMIN', passwordMasked: '********' },
      { id: 2, dni: '45678912', firstName: 'John', lastName: 'Doe', role: 'CUSTOMER', passwordMasked: '********' },
      { id: 3, dni: '78912345', firstName: 'Jane', lastName: 'Smith', role: 'CUSTOMER', passwordMasked: '********' },
      { id: 4, dni: '12345678', firstName: 'Luis', lastName: 'Vargas', role: 'ADMIN', passwordMasked: '********' }
    ];
  }

  openModal(mode: 'CREATE' | 'EDIT', user?: User): void {
    this.modalMode = mode;
    this.selectedUser = user || null;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
    document.body.style.overflow = '';
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }

  // Placeholder for save action
  saveUser(): void {
    this.closeModal();
    // Simulate save success
    alert('User saved successfully! (Visual Mock)');
  }
}
