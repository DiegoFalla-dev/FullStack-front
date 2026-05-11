import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { Event } from '../events.model';
import { AuthService, User } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

interface OrderData {
  eventId: number;
  zone: string;
  promotion: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  orderData: OrderData | null = null;
  event: Event | undefined;
  
  // Buyer Info
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';

  // Card Info
  cardNumber: string = '';
  cardHolder: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';

  // UI States
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  showSuccessModal: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Pre-llenar datos del usuario logueado
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.email = currentUser.email;
      this.phone = currentUser.phone;
    }

    // Get order data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.orderData = navigation.extras.state['orderData'];
      
      if (this.orderData) {
        this.event = this.eventsService.getEventById(this.orderData.eventId);
      }
    }

    // If no data, use default data for demo purposes
    if (!this.orderData || !this.event) {
      // Default demo event
      this.event = {
        id: 1,
        title: 'Concierto Coldplay',
        description: 'Una noche mágica con la mejor música',
        type: 'concierto',
        date: '15 de Mayo, 2026',
        time: '20:00',
        location: 'Estadio Nacional',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
        price: 150,
        rating: 4.8
      };

      // Default order data
      this.orderData = {
        eventId: 1,
        zone: 'Zona General',
        promotion: 'Precio Regular',
        quantity: 2,
        pricePerUnit: 150,
        total: 300
      };
    }
  }

  processPayment(): void {
    if (!this.validatePaymentForm()) {
      return;
    }

    this.isProcessing = true;
    this.paymentError = '';

    const paymentData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      cardNumber: this.cardNumber,
      cardHolder: this.cardHolder,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      cvv: this.cvv,
      total: this.orderData?.total,
      eventId: this.orderData?.eventId,
      zone: this.orderData?.zone,
      quantity: this.orderData?.quantity
    };

    // Simulate processing delay (2 seconds)
    setTimeout(() => {
      this.isProcessing = false;
      
      // Try to call backend, but show success modal either way
      this.http.post('http://localhost:8080/api/auth/payment', paymentData).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.showSuccessModal = true;
          } else {
            this.paymentError = response.message || 'Error al procesar el pago';
          }
        },
        error: (error) => {
          // Show success modal even if backend is not available
          this.showSuccessModal = true;
          console.log('Backend no disponible, mostrando modal de éxito de simulación');
        }
      });
    }, 2000);
  }

  validatePaymentForm(): boolean {
    if (!this.firstName || !this.lastName || !this.email || !this.phone) {
      this.paymentError = 'Por favor, completa tu información personal';
      return false;
    }

    if (!this.cardNumber || !this.cardHolder || !this.expiryMonth || !this.expiryYear || !this.cvv) {
      this.paymentError = 'Por favor, completa tu información de tarjeta';
      return false;
    }

    if (this.cardNumber.replace(/\s/g, '').length !== 16) {
      this.paymentError = 'El número de tarjeta debe tener 16 dígitos';
      return false;
    }

    if (this.cvv.length !== 3) {
      this.paymentError = 'El CVV debe tener 3 dígitos';
      return false;
    }

    return true;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
  }

  formatCardNumber(value: string): string {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }

  onCardNumberChange(event: any): void {
    this.cardNumber = this.formatCardNumber(event.target.value);
    event.target.value = this.cardNumber;
  }

  onExpiryChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.expiryMonth = value.split('/')[0] || '';
    this.expiryYear = value.split('/')[1] || '';
    event.target.value = value;
  }

  onCVVChange(event: any): void {
    this.cvv = event.target.value.replace(/\D/g, '').substring(0, 3);
    event.target.value = this.cvv;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
