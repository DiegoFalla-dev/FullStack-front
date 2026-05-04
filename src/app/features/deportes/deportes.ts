import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

@Component({
  selector: 'app-deportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deportes.html',
  styleUrl: './deportes.css'
})
export class Deportes implements OnInit {
  deportes: Event[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.deportes = this.eventsService.getEventsByType('deporte');
  }
}
