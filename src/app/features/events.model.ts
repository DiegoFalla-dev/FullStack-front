export type EventType = 'concierto' | 'teatro' | 'deporte' | 'festival';

export interface Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  image: string;
  price: number;
  rating: number;
}
