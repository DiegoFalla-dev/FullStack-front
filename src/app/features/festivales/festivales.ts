import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { Event } from '../events.model';

@Component({
  selector: 'app-festivales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './festivales.html',
  styleUrl: './festivales.css'
})
export class Festivales implements OnInit {
  festivales: Event[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.festivales = this.eventsService.getEventsByType('festival');
  }
}
