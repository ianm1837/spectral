import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

console.log('process.env.MONGODB_URI',process.env.MONGODB_URI)

let mongooseConnection = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log("Mongo connection error: ",err))

export default mongoose.connection
