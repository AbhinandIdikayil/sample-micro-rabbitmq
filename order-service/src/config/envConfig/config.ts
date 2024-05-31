import { config } from "dotenv";
config()

let port:Number = Number(process.env.PORT)

export {
    port
}

