import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy  from 'express-http-proxy'


const app:Application = express()
const PORT = process.env.PORT || 2000;

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const authProxy = proxy(`http:localhost:3000`)
const productProxy = proxy(`http:localhost:4000`)
const orderProxy = proxy(`http:localhost:5000`)

app.use('/auth',authProxy)
app.use('/product',productProxy)
app.use('/order',orderProxy)

app.listen(PORT ,() => {
    console.log(`gateway is listening to  ${PORT}`)
})