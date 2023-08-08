import { Router } from "express"

export class EventRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.initRouter()
  }

  initRouter() {
    this.router.post('/')
  }

}