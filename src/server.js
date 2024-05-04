import express from "express"
import cors from "cors"

import { validatePerson, validatePartialPerson } from "./scheme/validations"
import users from "../tests/MOCK_DATA.json"

const app = express()

app.disable("x-powered-by")

const PORT = process.env.PORT ?? 2350
const HOST = process.env.HOST ?? "localhost"
const PROTOCOL = process.env.PROTOCOL ?? "http"

const WHITELIST = ["https://ypage.com"]
const corsOptions = {
  origin: (origin, callback) => {
    if (WHITELIST.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error(/*"Not allowed by CORS"))*/`${origin} not allowed by CORS`))
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH"],
  optionsSuccessStatus: 204
}

app.use(express.json())
app.use(cors(corsOptions))

app.listen(PORT, () => {
  console.log(`Server listening on ${PROTOCOL}://${HOST}:${PORT}`)
})
