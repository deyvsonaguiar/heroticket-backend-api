import { Event } from "../entities/event";

export interface EventRepository {
  add(event: Event): Promise<Event>
}