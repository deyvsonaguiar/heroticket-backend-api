import express, { Application } from 'express'
import { connect } from './infra/database'
import { EventRouter } from './routes/event.router'
import { errorMiddleware } from './middlewares/error.middleware'

export class App {
  public app: Application
  private eventRouter = new EventRouter()
  
  constructor() {
    this.app = express()
    this.middlewaresInitializer()
    this.initializeRoutes()
    this.interceptionError()
    connect()
  }

  private initializeRoutes() {
    this.app.use('/events', this.eventRouter.router)
  }

  private interceptionError() {
    this.app.use(errorMiddleware)
  }

  private middlewaresInitializer() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }
  
  listen() {
    this.app.listen(3333, () => console.log('server is running'))
  }
}