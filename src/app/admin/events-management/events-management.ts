import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface EventZone {
  name: string;
  price: number;
}

export interface TicketEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  artists: string;
  description: string;
  zones: EventZone[];
}

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-management.html',
  styleUrls: ['../users-management/users-management.css', './events-management.css']
})
export class EventsManagementComponent implements OnInit {
  events: TicketEvent[] = [];
  isLoading = false;
  currentAdminName = 'Admin Master';
  activeTab: 'usuarios' | 'eventos' = 'eventos';
  isModalOpen = false;
  modalMode: 'CREATE' | 'EDIT' = 'CREATE';
  selectedEvent: TicketEvent | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Intentar obtener el nombre del admin real
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentAdminName = `${user.firstName} ${user.lastName}`;
    }

    // Mock data según tu solicitud
    this.events = [
      {
        id: 1,
        title: 'Neon Nights Festival',
        date: '2026-08-15',
        time: '20:00',
        location: 'Estadio Nacional, Lima',
        artists: 'Dua Lipa, The Weeknd',
        description: 'The biggest electronic and pop festival of the year.',
        zones: [{ name: 'VIP', price: 350 }, { name: 'General', price: 150 }]
      },
      {
        id: 2,
        title: 'Rock Classics Live',
        date: '2026-09-20',
        time: '19:30',
        location: 'Arena Perú',
        artists: 'Guns N Roses',
        description: 'A nostalgic night with the best rock classics.',
        zones: [{ name: 'Platinum', price: 500 }, { name: 'Tribuna', price: 200 }]
      }
    ];
  }

  goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  openModal(mode: 'CREATE' | 'EDIT', event?: TicketEvent): void {
    this.modalMode = mode;
    this.selectedEvent = event ? JSON.parse(JSON.stringify(event)) : null; // Clon profundo
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEvent = null;
    document.body.style.overflow = '';
  }

  deleteEvent(eventId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.events = this.events.filter(e => e.id !== eventId);
    }
  }

  saveEvent(): void {
    this.closeModal();
    alert('Evento guardado exitosamente! (Visual Mock)');
  }

  formatZones(zones: EventZone[]): string {
    return zones.map(z => `${z.name} ($${z.price})`).join(', ');
  }
}