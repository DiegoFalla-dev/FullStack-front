import { Component, NgModule } from '@angular/core';
import { Navbar } from './components/navbar/navbar' ;
import { Footer } from './components/footer/footer' ;
import { EventCard } from './components/event-card/event-card';  

@Component({
  selector: 'app-shared',
  imports: [],
  templateUrl: './shared.html',
  styleUrl: './shared.css',
})

export class Shared {}
