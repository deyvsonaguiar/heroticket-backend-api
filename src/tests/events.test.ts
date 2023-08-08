import request from "supertest"
import { Event } from "../entities/event"
import { App } from "../app"

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
      date: new Date()
    }

    const response = await request(express)
      .post('/events')
      .field('title', event.title)
      .field('description', event.description)
      .field('city', event.city)
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
})