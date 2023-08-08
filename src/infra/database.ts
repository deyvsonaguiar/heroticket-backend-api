import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect('mongodb+srv://deyvsonaguiar:0KR5uVwbYf0OMZ70@cluster0.fyfrcj6.mongodb.net/hero-tickets')
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}