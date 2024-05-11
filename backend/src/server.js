import express from "express"

import { routerPerson } from "./routes/routePerson"
import { corsMiddleware } from "./middleware/cors"

const app = express()

app.disable("x-powered-by")

const PORT = process.env.PORT ?? 2350
const HOST = process.env.HOST ?? "localhost"
const PROTOCOL = process.env.PROTOCOL ?? "http"

app.use(express.json())
app.use(corsMiddleware())

app.use("/person", routerPerson)

app.listen(PORT, () => {
  console.log(`Server listening on ${PROTOCOL}://${HOST}:${PORT}`)
})
