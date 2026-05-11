import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

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

  @ViewChild('eventosDestacados') eventosDestacados!: ElementRef;

  searchQuery    = '';
  activeCategory = 'todos';
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
 
  categories: Category[] = [
    { label: 'Conciertos', value: 'concierto', emoji: '🎵' },
    { label: 'Teatro',     value: 'teatro',     emoji: '🎭' },
    { label: 'Deportes',   value: 'deporte',    emoji: '⚽' },
    { label: 'Festivales', value: 'festival', emoji: '🎉' },
  ];
 
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
    { icon: '🎯', title: 'Gran variedad',        desc: 'Más de 50 eventos activos. Siempre hay algo nuevo.' },
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
 
  constructor(private router: Router, private eventsService: EventsService, private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    // Leer query params para categoría
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.activeCategory = params['category'];
        // Scrollear hacia la sección de eventos destacados después de un pequeño delay
        setTimeout(() => {
          this.scrollToEventos();
        }, 100);
      }
    });
    this.loadEvents();
  }

  private scrollToEventos(): void {
    if (this.eventosDestacados) {
      this.eventosDestacados.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private loadEvents(): void {
    this.allEvents = this.eventsService.getAllEvents();
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
      list = list.filter(e => e.type === this.activeCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
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
    this.router.navigate(['/eventos', id]);
  }
 
  goToEvents(): void {
    this.router.navigate(['/eventos']);
  }
 
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  getEventTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      concierto: 'Concierto',
      teatro: 'Teatro',
      deporte: 'Deporte',
      festival: 'Festival'
    };
    return labels[type] || 'Evento';
  }

  getEventTypeEmoji(type: string): string {
    const emojis: { [key: string]: string } = {
      concierto: '🎵',
      teatro: '🎭',
      deporte: '⚽',
      festival: '🎉'
    };
    return emojis[type] || '🎉';
  }
}
 