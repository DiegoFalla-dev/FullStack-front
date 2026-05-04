import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

@Component({
  selector: 'app-teatro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teatro.html',
  styleUrl: './teatro.css'
})
export class Teatro implements OnInit {
  teatros: Event[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.teatros = this.eventsService.getEventsByType('teatro');
  }
}
