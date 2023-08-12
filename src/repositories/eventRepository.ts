import { Event } from "../entities/event";
import { Location } from "../entities/location";

export interface EventRepository {
  add(event: Event): Promise<Event>
  findByLocationandDate(location: Location, date: Date): Promise<Event | undefined>
  findEventByCity(city: string): Promise<Event[]>
}