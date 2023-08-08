import { NextFunction, Request, Response } from "express"
import { HttpInterception } from "../interfaces/HttpInterception"

export function errorMiddleware(
  err: HttpInterception, 
  req: Request, 
  res: Response, 
  next: NextFunction
  ) {
  const status: number = err.status ?? 500
  const message: string = err.message ?? 'Internal server error'

  res.status(status).json({
    status,
    message,
  })
}