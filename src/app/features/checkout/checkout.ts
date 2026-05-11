import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
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

  // Format card number as user types (XXXX XXXX XXXX XXXX)
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

  // Format expiry (MM/YY)
  onExpiryChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.expiryMonth = value.split('/')[0] || '';
    this.expiryYear = value.split('/')[1] || '';
  }

  // CVV only numbers
  onCVVChange(event: any): void {
    this.cvv = event.target.value.replace(/\D/g, '').substring(0, 3);
    event.target.value = this.cvv;
  }

  processPayment(): void {
    // Validation
    if (!this.firstName || !this.lastName || !this.email || !this.phone) {
      this.paymentError = 'Por favor completa todos los datos personales';
      return;
    }

    if (!this.cardNumber || !this.cardHolder || !this.expiryMonth || !this.expiryYear || !this.cvv) {
      this.paymentError = 'Por favor completa todos los datos de la tarjeta';
      return;
    }

    if (this.cardNumber.replace(/\s/g, '').length !== 16) {
      this.paymentError = 'Número de tarjeta inválido (16 dígitos requeridos)';
      return;
    }

    if (this.cvv.length !== 3) {
      this.paymentError = 'CVV inválido (3 dígitos requeridos)';
      return;
    }

    // Simulate payment processing
    this.isProcessing = true;
    this.paymentError = '';

    // Simulate API call
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
      
      // After 3 seconds, redirect to home
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
