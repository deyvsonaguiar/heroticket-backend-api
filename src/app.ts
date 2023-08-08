import express, { Application } from 'express'
import { connect } from './infra/database'

export class App {
  public app: Application
  
  constructor() {
    this.app = express()
    this.middlewaresInitializer()
    this.initializeRoutes()
    this.interceptionError()
    connect()
  }

  initializeRoutes() {
    // this.app.use('/user', userRouter)
  }

  interceptionError() {
    // this.app.use((err, req, res, next) => {
    //   res.status(500).json({ message: 'Internal server error' })
    // })
  }

  middlewaresInitializer() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true}))
  }
  
  listen() {
    this.app.listen(3333, () => console.log('server is running'))
  }
}