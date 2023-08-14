import mongoose from "mongoose"
import { Event } from "../entities/event"
import { EventRepository } from "./eventRepository"
import { Location } from "../entities/location"
import { IFilterProps } from "../useCases/eventUseCase"

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

  async findEventsByName(name: string): Promise<Event[]> {
    const findEvent = await EventModel.find({
      title: {
        $regex: name,
        $options: 'i',
      },
    }).exec();

    return findEvent.map((event) => event.toObject());
  }

  async findEventById(id: string): Promise<Event | undefined> {
    const findEvent = await EventModel.findOne({ _id: id }).exec();

    return findEvent ? findEvent.toObject() : undefined;
  }
  
  async findEventsByFilter({
    latitude,
    longitude,
    name,
    date,
    category,
    radius,
    price,
  }: IFilterProps): Promise<Event[]> {
    const query = {
      $and: [
        { title: name ? { $regex: name, $options: 'i' } : { $exists: true } },

        { date: date ? { $gte: new Date(date) } : { $exists: true } },
        // { categories: category ? { $in: [category] } : { $exists: true } },
        // {
        //   'price.amount': {
        //     $gte: price ? String(price) : '0',
        //   },
        // },
        {
          'location.latitude': {
            $gte: String(latitude - radius),
            $lte: String(latitude + radius),
          },
          'location.longitude': {
            $gte: String(longitude - radius),
            $lte: String(longitude + radius),
          },
        },
      ],
    };
    const findEvent = await EventModel.find(query).exec();

    return findEvent.map((event) => event.toObject());
  }

  async findEventsMain(date: Date): Promise<Event[]> {
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    const findEvent = await EventModel.find({
      date: { $gte: date, $lt: endDate },
    })
      .limit(4)
      .exec();

    return findEvent.map((event) => event.toObject());
  }

  async update(event: Event, id: string): Promise<any> {
    const eventUpdate = await EventModel.updateMany({ _id: id }, event);

    return event;
  }
}