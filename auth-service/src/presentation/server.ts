import express, { Application } from 'express'
import dotenv from 'dotenv'
import { userRoute } from '../infrastructure/routes/userRoute'
import { dependencies } from '../config/dependencies'
import cookieParser from 'cookie-parser'

dotenv.config()
const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(userRoute(dependencies))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is runnig no ${PORT}`)
})

export default app;