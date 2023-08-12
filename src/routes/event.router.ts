import { Router } from "express"
import { EventRepositoryMongoose } from "../repositories/eventRepositoryMongoose"
import { EventUseCase } from "../useCases/eventUseCase"
import { EventController } from "../controllers/eventController"
import { upload } from "../infra/multer"

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
    this.router.post(
      '/', 
      upload.fields([
        {
          name: 'banner',
          maxCount: 1,
        },
        {
          name: 'flyers',
          maxCount: 3,
        },
      ]), 
      this.eventController.create.bind(this.eventController),
    )
    this.router.get(
      '/',
      this.eventController.findEventByLocation.bind(this.eventController),
    );
  }
}