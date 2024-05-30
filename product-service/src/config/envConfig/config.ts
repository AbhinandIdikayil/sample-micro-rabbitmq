import {config} from 'dotenv'
config()

let PORT:Number = Number(process.env.PORT)

export  {
    PORT
}