import mongoose from "mongoose"
import { Event } from "../entities/event"
import { EventRepository } from "./eventRepository"

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
  
}