import { Event } from "../entities/event";
import { Location } from "../entities/location";
import { IFilterProps } from "../useCases/eventUseCase";

export interface EventRepository {
  add(event: Event): Promise<Event>
  findByLocationandDate(location: Location, date: Date): Promise<Event | undefined>
  findEventByCity(city: string): Promise<Event[]>
  findEventsByCategory(category: string): Promise<Event[]>
  findEventsByName(name: string): Promise<Event[]>
  findEventById(id: string): Promise<Event | undefined>
  update(event: Event, id: string): Promise<any>
  findEventsByFilter({
    latitude,
    longitude,
    name,
    date,
    category,
    radius,
    price,
  }: IFilterProps): Promise<Event[]>
  findEventsMain(date: Date): Promise<Event[]>
}