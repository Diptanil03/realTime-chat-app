import dotenv from'dotenv'
dotenv.config()
import express from 'express'
import { connectdb } from './db/connection1.js'
import userRouter from './routes/user.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import messageRouter from './routes/message.route.js'
import cors from 'cors'
import {app,server} from './socket/socket.js'
connectdb();


const port=process.env.PORT || 8000


app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use(errorMiddleware)

server.listen(port,()=>{
    console.log('sever is running on: ',port)
})