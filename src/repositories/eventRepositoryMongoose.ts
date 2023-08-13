import mongoose from "mongoose"
import { Event } from "../entities/event"
import { EventRepository } from "./eventRepository"
import { Location } from "../entities/location"

const eventSchema = new mongoose.Schema({
  title: String,
  location: {
    latitude: String,
    longitude: String,
  },
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  categories: [String],
  description: String,
  banner: String,
  flyers: [String],
  coupons: [String],
  participants: {
    type: Array,
    ref: 'User'
  },
  price: {
    type: Array,
  },
  city: String
})

const EventModel = mongoose.model('Event', eventSchema)

export class EventRepositoryMongoose implements EventRepository {
  
  async add(event: Event): Promise<Event> {
    const eventModel = new EventModel(event)
    await eventModel.save()
    return event
  }
  
  async findByLocationandDate(location: Location, date: Date): Promise<Event | undefined> {
    const findEvent = await EventModel.findOne({ location, date }).exec()
    return findEvent ? findEvent.toObject() : undefined
  }

  async findEventByCity(city: string): Promise<Event[]> {
    const findEvent = await EventModel.find({ city }).exec()
    return findEvent.map(event => event.toObject())
  }

  async findEventsByCategory(category: string): Promise<Event[]> {
    const findEvent = await EventModel.find({ categories: category }).exec()
    return findEvent.map(event => event.toObject())
  }
}