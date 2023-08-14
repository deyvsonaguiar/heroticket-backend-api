import request from "supertest"
import { App } from "../app"
import { EventUseCase } from "../useCases/eventUseCase"
import { Event } from "../entities/event"
import crypto from "node:crypto"

const app = new App()
const express = app.app

describe('Teste de evento', () => {
  it('/POST event', async () => {
    const event = {
      title: 'Jorge e Matues',
      price: [{ sector: 'Pista', amount: '20'}],
      categories: ['Show'],
      description: 'Descrição do evento',
      city: 'Belo Horizonte',
      location: {
        latitude: '-19.8658619',
        longitude: '-43.9737064'
      },
      coupons: [],
      participants: [],
      date: new Date(),
    }

    const response = await request(express)
      .post('/events')
      .field('title', event.title)
      .field('description', event.description)
      .field('city', event.city)
      .field('categories', event.categories)
      .field('date', event.date.toISOString())
      .field('coupons', event.coupons)
      .field('location[latitude]', event.location.latitude)
      .field('location[longitude]', event.location.longitude)
      .field('price[sector]', event.price[0].sector)
      .field('price[amount]', event.price[0].amount)
      .attach('banner', '/home/deyvsonaguiar/programacao/hero-tickets/backend/src/images/banner.png')
      .attach('flyers', '/home/deyvsonaguiar/programacao/hero-tickets/backend/src/images/flyer1.png')
      .attach('flyers', '/home/deyvsonaguiar/programacao/hero-tickets/backend/src/images/flyer2.png')

    if(response.error) {
      console.log(response.error)
    }

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: "Evento criado com sucesso!" })
  })
  it('/GET  event by location', async () => {
    const response = await request(express).get(
      '/events?latitude=-19.8658619&longitude=-43.9737064',
    );

    if (response.error) {
      console.log(response.error)
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  })
  it('/GET  event by category', async () => {
    const response = await request(express).get('/events/category/Show')

    if (response.error) {
      console.log(response.error)
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  })
  it('/GET/:id  event by id', async () => {
    const response = await request(express).get(
      '/events/64d8078eba89afab4778135f',
    );

    if (response.error) {
      console.log(response.error)
    }

    expect(response.status).toBe(200)
  })
  it('/POST  event insert user', async () => {
    const response = await request(express)
      .post('/events/64d8078eba89afab4778135f/participants')
      .send({
        name: 'Deyvson',
        email: crypto.randomBytes(10).toString('hex') + '@teste.com',
      });

    if (response.error) {
      console.log(response.error)
    }

    expect(response.status).toBe(200)
  })
})

const eventRepository = {
  add: jest.fn(),
  findByLocationandDate: jest.fn(),
  findEventByCity: jest.fn(),
  findEventsByCategory: jest.fn(),
  findEventsByName: jest.fn(),
  findEventById: jest.fn(),
  findEventsByFilter: jest.fn(),
  findEventsMain: jest.fn(),
  update: jest.fn(),
}

const eventUseCase = new EventUseCase(eventRepository)
const event: Event = {
  title: 'Jorge e Mateus',
  price: [{ sector: 'Pista', amount: '20' }],
  categories: ['Show'],
  description: 'Descrição do evento',
  city: 'Belo Horizonte',
  location: {
    latitude: '-19.8658619',
    longitude: '-43.9737064'
  },
  banner: 'banner.png',
  flyers: ['flyer1.png', 'flyer2.png'],
  coupons: [],
  participants: [],
  date: new Date(),
}

describe('Unit test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return an array of events by category', async () => {
    eventRepository.findEventsByCategory.mockResolvedValue([event])
    const result = await eventUseCase.findEventsByCategory('Show')
    expect(result).toEqual([event])
    expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith('Show')
  })
  it('should return events by name', async () => {
    eventRepository.findEventsByName.mockResolvedValue([event])
    const result = await eventUseCase.findEventsByName('Jorge e Mateus')
    expect(result).toEqual([event])
    expect(eventRepository.findEventsByName).toHaveBeenCalledWith('Jorge e Mateus')
  })
  it('should return event by id', async () => {
    eventRepository.findEventById.mockResolvedValue(event)
    const result = await eventUseCase.findEventsById('64d8078eba89afab4778135f')
    expect(result).toEqual(event)
    expect(eventRepository.findEventById).toHaveBeenCalledWith('64d8078eba89afab4778135f')
  })
})