import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  isModalOpen = false;
  modalMode: 'CREATE' | 'EDIT' = 'CREATE';
  selectedEvent: TicketEvent | null = null;

  ngOnInit(): void {
    // Mock data for UI demonstration
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

  openModal(mode: 'CREATE' | 'EDIT', event?: TicketEvent): void {
    this.modalMode = mode;
    this.selectedEvent = event || null;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEvent = null;
    document.body.style.overflow = '';
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== eventId);
    }
  }

  saveEvent(): void {
    this.closeModal();
    alert('Event saved successfully! (Visual Mock)');
  }

  formatZones(zones: EventZone[]): string {
    return zones.map(z => `${z.name} ($${z.price})`).join(', ');
  }
}
