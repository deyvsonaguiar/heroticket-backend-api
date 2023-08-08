import { Router } from "express"
import { EventRepositoryMongoose } from "../repositories/eventRepositoryMongoose"
import { EventUseCase } from "../useCases/eventUseCase"
import { EventController } from "../controllers/eventController"

export class EventRouter {
  public router: Router
  private eventController: EventController

  constructor() {
    this.router = Router()
    const eventRepository = new EventRepositoryMongoose()
    const eventUseCase = new EventUseCase(eventRepository)
    this.eventController = new EventController(eventUseCase)
    this.initRouter()
  }

  initRouter() {
    this.router.post('/', this.eventController.create.bind(this.eventController))
  }

}