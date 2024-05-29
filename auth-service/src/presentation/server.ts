import express, { Application } from 'express'
import dotenv from 'dotenv'


dotenv.config()
const app:Application = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`server is runnig no ${PORT}`)
})

export default app;