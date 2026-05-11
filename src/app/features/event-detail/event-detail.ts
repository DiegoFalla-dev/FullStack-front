import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

interface Zone {
  name: string;
  price: number;
  quantity?: number;
}

interface Promotion {
  id: string;
  label: string;
  description: string;
  multiplier: number;
  icon: string;
  price?: number; // Precio calculado
}

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})
export class EventDetail implements OnInit {
  event: Event | undefined;
  selectedZone: Zone | null = null;
  selectedPromotion: Promotion | null = null;
  quantity: number = 1;
  zones: Zone[] = [];
  cartCount: number = 0;

  promotions: Promotion[] = [
    { id: 'regular', label: 'Precio Regular', description: 'Acceso completo', multiplier: 1, icon: '🎫' },
    { id: 'discount', label: 'Precio con Descuento', description: 'Descuento especial', multiplier: 0.85, icon: '🏷️' },
    { id: 'disability', label: '50% Descuento', description: 'Para personas con discapacidad', multiplier: 0.5, icon: '♿' }
  ];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = parseInt(params['id'], 10);
      this.event = this.eventsService.getEventById(eventId);
      
      if (!this.event) {
        this.router.navigate(['/']);
        return;
      }

      // Initialize zones based on event type
      this.initializeZones();
      // Set default promotion
      this.selectPromotion(this.promotions[0]);
    });
  }

  private initializeZones(): void {
    // Define zones based on event type
    const zonesByType: { [key: string]: Zone[] } = {
      concierto: [
        { name: 'Zona General', price: 80 },
        { name: 'Preferencial', price: 120 },
        { name: 'VIP', price: 200 }
      ],
      teatro: [
        { name: 'Galería', price: 30 },
        { name: 'Platea', price: 50 },
        { name: 'Palco', price: 80 }
      ],
      deporte: [
        { name: 'Tribuna General', price: 50 },
        { name: 'Tribuna Premium', price: 90 },
        { name: 'Palco VIP', price: 150 }
      ],
      festival: [
        { name: 'Acceso General', price: 60 },
        { name: 'Acceso Plus', price: 100 },
        { name: 'Acceso VIP', price: 180 }
      ]
    };

    this.zones = zonesByType[this.event!.type] || zonesByType['concierto'];
  }

  selectPromotion(promotion: Promotion): void {
    this.selectedPromotion = promotion;
    // Calculate promotion price for each zone
    this.promotions.forEach(p => {
      p.price = Math.round(this.event!.price * p.multiplier);
    });
    this.quantity = 1; // Reset quantity when changing promotion
  }

  selectZone(zone: Zone): void {
    this.selectedZone = zone;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getPromotionPrice(): number {
    if (!this.selectedZone || !this.selectedPromotion) return 0;
    return Math.round(this.selectedZone.price * this.selectedPromotion.multiplier);
  }

  getTotalPrice(): number {
    return this.getPromotionPrice() * this.quantity;
  }

  addToCart(): void {
    if (this.selectedZone && this.selectedPromotion && this.quantity > 0) {
      // Prepare order data
      const orderData = {
        eventId: this.event!.id,
        zone: this.selectedZone.name,
        promotion: this.selectedPromotion.label,
        quantity: this.quantity,
        pricePerUnit: this.getPromotionPrice(),
        total: this.getTotalPrice()
      };

      // Navigate to checkout with order data
      this.router.navigate(['/checkout'], {
        state: { orderData }
      });
    }
  }

  getTypeLabel(): string {
    const labels: { [key: string]: string } = {
      concierto: 'Concierto',
      teatro: 'Teatro',
      deporte: 'Deporte',
      festival: 'Festival'
    };
    return labels[this.event?.type || 'concierto'];
  }

  getTypeIcon(): string {
    const icons: { [key: string]: string } = {
      concierto: '🎵',
      teatro: '🎭',
      deporte: '⚽',
      festival: '🎉'
    };
    return icons[this.event?.type || 'concierto'];
  }
}
