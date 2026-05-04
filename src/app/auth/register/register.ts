import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!this.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    console.log('Register:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });
  }
}
