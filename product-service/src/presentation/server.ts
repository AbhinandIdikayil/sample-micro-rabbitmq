import express, { Application } from 'express'
import {PORT} from '../config/envConfig/config'
import { productRoute } from '../infrastructure/routes/productRoute';
import { dependencies } from '../config/dependencies';

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

const port = PORT || 4000

app.use(productRoute(dependencies))

app.listen(port , () => {
    console.log(`product service is running on ${PORT}`)
})


export default app