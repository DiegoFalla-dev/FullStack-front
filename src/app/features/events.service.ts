import { Injectable } from '@angular/core';
import { Event, EventType } from './events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [
    // Conciertos
    {
      id: 1,
      title: 'The Weeknd Live Tour',
      description: 'Concierto en vivo del artista The Weeknd',
      type: 'concierto',
      date: '2026-06-15',
      time: '20:00',
      location: 'Estadio Nacional',
      image: 'https://i0.wp.com/placeres.pe/wp-content/uploads/2025/02/img_1219.jpg?fit=1920%2C1180&ssl=1',
      price: 150,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Coldplay en Concierto',
      description: 'Experiencia única con la banda británica',
      type: 'concierto',
      date: '2026-07-10',
      time: '19:30',
      location: 'Arena Metropolitana',
      image: 'https://i0.wp.com/placeres.pe/wp-content/uploads/2025/02/img_1219.jpg?fit=1920%2C1180&ssl=1',
      price: 120,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Concierto de Música Indie',
      description: 'Festival con bandas independientes',
      type: 'concierto',
      date: '2026-08-20',
      time: '18:00',
      location: 'Parque Central',
      image: 'https://i0.wp.com/placeres.pe/wp-content/uploads/2025/02/img_1219.jpg?fit=1920%2C1180&ssl=1',
      price: 80,
      rating: 4.5
    },
    // Teatro
    {
      id: 4,
      title: 'Hamlet - Obra Clásica',
      description: 'Adaptación moderna de la obra de Shakespeare',
      type: 'teatro',
      date: '2026-06-20',
      time: '19:00',
      location: 'Teatro Nacional',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80',
      price: 45,
      rating: 4.7
    },
    {
      id: 5,
      title: 'La Casa de los Espíritus',
      description: 'Drama familiar inspirado en la novela de Isabel Allende',
      type: 'teatro',
      date: '2026-07-05',
      time: '20:00',
      location: 'Teatro Colón',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80',
      price: 55,
      rating: 4.6
    },
    {
      id: 6,
      title: 'Comedia: Risas Garantizadas',
      description: 'Obra de comedia para toda la familia',
      type: 'teatro',
      date: '2026-06-25',
      time: '18:30',
      location: 'Teatro de la Risa',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80',
      price: 35,
      rating: 4.4
    },
    // Deportes
    {
      id: 7,
      title: 'Clásico de Fútbol: Equipo A vs Equipo B',
      description: 'Partido decisivo del campeonato nacional',
      type: 'deporte',
      date: '2026-06-10',
      time: '15:00',
      location: 'Estadio Olímpico',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      price: 70,
      rating: 4.8
    },
    {
      id: 8,
      title: 'Tenis Abierto Internacional',
      description: 'Torneo de tenis con jugadores mundiales',
      type: 'deporte',
      date: '2026-07-15',
      time: '14:00',
      location: 'Centro de Tenis',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      price: 85,
      rating: 4.7
    },
    {
      id: 9,
      title: 'Campeonato de Boxeo',
      description: 'Pelea estelar con campeones mundiales',
      type: 'deporte',
      date: '2026-08-01',
      time: '20:00',
      location: 'Arena de Combate',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
      price: 200,
      rating: 4.9
    },
    // Festivales
    {
      id: 10,
      title: 'Festival de Cine Internacional',
      description: 'Proyección de películas de todo el mundo',
      type: 'festival',
      date: '2026-06-30',
      time: '16:00',
      location: 'Centro de Convenciones',
      image: 'https://plus.unsplash.com/premium_photo-1661284892176-fd7713b764a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 25,
      rating: 4.8
    },
    {
      id: 11,
      title: 'Festival de Comida Callejera',
      description: 'Degustación de platillos típicos y modernos',
      type: 'festival',
      date: '2026-07-20',
      time: '11:00',
      location: 'Plaza Mayor',
      image: 'https://plus.unsplash.com/premium_photo-1661284892176-fd7713b764a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 30,
      rating: 4.6
    },
    {
      id: 12,
      title: 'Festival de Arte y Cultura',
      description: 'Exhibición de arte contemporáneo y tradicional',
      type: 'festival',
      date: '2026-08-10',
      time: '10:00',
      location: 'Museo de Bellas Artes',
      image: 'https://plus.unsplash.com/premium_photo-1661284892176-fd7713b764a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 20,
      rating: 4.5
    }
  ];

  getEventsByType(type: EventType): Event[] {
    return this.events.filter(event => event.type === type);
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  getAllEvents(): Event[] {
    return this.events;
  }
}
