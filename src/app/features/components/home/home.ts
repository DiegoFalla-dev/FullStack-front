import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface EventItem {
  id:            number;
  name:          string;
  date:          string;
  venue:         string;
  price:         number;
  category:      string;
  categoryLabel: string;
  emoji:         string;
  gradient:      string;
  badge?:        string;
}
 
interface Category {
  label: string;
  value: string;
  emoji: string;
}
 
interface Step {
  number: string;
  icon:   string;
  title:  string;
  desc:   string;
}
 
interface Benefit {
  icon:  string;
  title: string;
  desc:  string;
}
 
interface Testimonial {
  name:   string;
  role:   string;
  text:   string;
  initials: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class Home implements OnInit {

  searchQuery    = '';
  activeCategory = 'todos';
 
  categories: Category[] = [
    { label: 'Conciertos', value: 'conciertos', emoji: '🎵' },
    { label: 'Teatro',     value: 'teatro',     emoji: '🎭' },
    { label: 'Stand-up',   value: 'standup',    emoji: '🎤' },
    { label: 'Festivales', value: 'festivales', emoji: '🎉' },
    { label: 'Deportes',   value: 'deportes',   emoji: '🏟️' },
  ];
 
  allEvents: EventItem[] = [
    {
      id: 1, name: 'Rock en Lima 2026',
      date: 'Sáb 15 Jun · 7:00 PM', venue: 'Estadio Nacional, Lima',
      price: 120, category: 'conciertos', categoryLabel: 'Concierto',
      emoji: '🎸', gradient: 'grad-purple', badge: '🔥 Agotándose',
    },
    {
      id: 2, name: 'El Rey León — Musical',
      date: 'Vie 20 Jun · 8:00 PM', venue: 'Teatro Municipal, Lima',
      price: 80, category: 'teatro', categoryLabel: 'Teatro',
      emoji: '🎭', gradient: 'grad-emerald',
    },
    {
      id: 3, name: 'Carlos Alcántara — Unipersonal',
      date: 'Dom 22 Jun · 7:30 PM', venue: 'Centro de Convenciones, Lima',
      price: 65, category: 'standup', categoryLabel: 'Stand-up',
      emoji: '🎤', gradient: 'grad-blue', badge: '⭐ Destacado',
    },
    {
      id: 4, name: 'Lima Music Festival',
      date: 'Sáb 05 Jul · 4:00 PM', venue: 'Parque de la Exposición, Lima',
      price: 150, category: 'festivales', categoryLabel: 'Festival',
      emoji: '🎪', gradient: 'grad-rose', badge: '🎉 Nuevo',
    },
    {
      id: 5, name: 'Clásico Alianza vs U',
      date: 'Dom 22 Jun · 3:00 PM', venue: 'Estadio Monumental, Lima',
      price: 50, category: 'deportes', categoryLabel: 'Deporte',
      emoji: '🏟️', gradient: 'grad-amber',
    },
    {
      id: 6, name: 'Noche de Jazz 2026',
      date: 'Jue 12 Jul · 9:00 PM', venue: 'Auditorio Miraflores, Lima',
      price: 90, category: 'conciertos', categoryLabel: 'Concierto',
      emoji: '🎷', gradient: 'grad-slate',
    },
  ];
 
  filteredEvents: EventItem[] = [];
 
  steps: Step[] = [
    { number: '01', icon: '🔍', title: 'Busca tu evento',      desc: 'Explora la cartelera de conciertos, teatro, festivales y más.' },
    { number: '02', icon: '🎟️', title: 'Elige tu entrada',     desc: 'Selecciona zona, cantidad y tipo de entrada a tu medida.' },
    { number: '03', icon: '👤', title: 'Regístrate o ingresa', desc: 'Crea tu cuenta en segundos o accede si ya eres parte de TicketFlow.' },
    { number: '04', icon: '📱', title: 'Recibe tu entrada',    desc: 'Tu código QR llega de inmediato a tu correo y perfil.' },
  ];
 
  benefits: Benefit[] = [
    { icon: '⚡', title: 'Compra en segundos',   desc: 'Proceso sin complicaciones. En menos de 2 minutos tienes tu entrada.' },
    { icon: '🔒', title: 'Pago 100 % seguro',    desc: 'Transacciones cifradas. Tu información financiera siempre está protegida.' },
    { icon: '📱', title: 'Entrada digital QR',   desc: 'Sin papel ni filas. Muestra tu QR en la puerta y listo.' },
    { icon: '🔔', title: 'Notificaciones',       desc: 'Te avisamos sobre preventas, cambios de fecha y nuevos eventos.' },
    { icon: '🎯', title: 'Gran variedad',        desc: 'Más de 50 eventos activos en Lima. Siempre hay algo nuevo.' },
    { icon: '💬', title: 'Soporte inmediato',    desc: 'Atención disponible antes y durante el evento para lo que necesites.' },
  ];
 
  testimonials: Testimonial[] = [
    {
      name: 'Valentina M.', role: 'Chorrillos · Compradora frecuente', rating: 5,
      initials: 'VM',
      text: 'Compré las entradas para Rock en Lima en minutos. El proceso es súper sencillo y el QR llegó de inmediato.',
    },
    {
      name: 'Diego R.', role: 'Miraflores · Fanático del teatro', rating: 5,
      initials: 'DR',
      text: 'Me encanta ver toda la cartelera de teatro en un solo lugar. La sección de categorías me ahorra mucho tiempo.',
    },
    {
      name: 'Camila T.', role: 'San Isidro · Asidua a festivales', rating: 5,
      initials: 'CT',
      text: 'Las notificaciones de preventa son increíbles. Siempre consigo los mejores lugares antes de que se agoten.',
    },
  ];
 
  starsArray = [1, 2, 3, 4, 5];
 
  constructor(private router: Router) {}
 
  ngOnInit(): void {
    this.filterEvents();
  }
 
  setCategory(value: string): void {
    this.activeCategory = value;
    this.searchQuery    = '';
    this.filterEvents();
  }
 
  filterEvents(): void {
    let list = this.allEvents;
    if (this.activeCategory !== 'todos') {
      list = list.filter(e => e.category === this.activeCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.categoryLabel.toLowerCase().includes(q)
      );
    }
    this.filteredEvents = list;
  }
 
  onSearch(): void {
    this.activeCategory = 'todos';
    this.filterEvents();
  }
 
  clearSearch(): void {
    this.searchQuery    = '';
    this.activeCategory = 'todos';
    this.filterEvents();
  }
 
  goToEvent(id: number): void {
    this.router.navigate(['/events', id]);
  }
 
  goToEvents(): void {
    this.router.navigate(['/events']);
  }
 
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
 