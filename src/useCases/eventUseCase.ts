import { Event } from "../entities/event";
import { EventRepository } from "../repositories/eventRepository";

export class EventUseCase {

  constructor(private eventRepository: EventRepository) {}

  async create(eventData: Event) {
    const result = await this.eventRepository.add(eventData)
    return result
  }
}