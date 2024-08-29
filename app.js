import express from 'express'
import mongoose from'mongoose'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
//Routes
import AuthRouter from './routes/auth.routes.js'
import MessageRouter from './routes/message.routes.js'
import UserRouter from './routes/user.routes.js'

const server = express()
dotenv.config()

server.use(express.json())
server.use(cookieParser()) 

server.use('/auth', AuthRouter)
server.use('/users', UserRouter)
server.use('/messages', MessageRouter)

const PORT = process.env.PORT 
const MONGODB_URL = process.env.MONGODB_URL

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

mongoose.connect(MONGODB_URL).then(() => {
    console.log('Database connection established')
}).catch((err) => console.log('Database connection error:', err));