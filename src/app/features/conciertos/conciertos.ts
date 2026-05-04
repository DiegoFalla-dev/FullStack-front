import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

@Component({
  selector: 'app-conciertos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conciertos.html',
  styleUrl: './conciertos.css'
})
export class Conciertos implements OnInit {
  conciertos: Event[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.conciertos = this.eventsService.getEventsByType('concierto');
  }
}
