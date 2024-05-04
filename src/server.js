import express from "express"
import cors from "cors"
import datejs from "datejs"

import { validatePerson, validatePartialPerson } from "./scheme/validations.js"
import users from "../tests/MOCK_DATA.json" assert {type: "json"}

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

app.get("/person", (req, res) => {
  res.status(200).json(users)
})
app.get("/person/:id", (req, res) => {
  const { id } = req.params
  const personIndex = users.findIndex(user => user.id === id)
  if (personIndex === -1) return res.status(404).json({ error: "person not found" })
  res.status(200).json(users[personIndex])
})
app.post("/person", (req, res) => {
  const result = validatePerson(req.body)
  if (!result.success) return res.status(422).json({ error: result.error })

  const newPerson = {
    id: crypto.randomUUID(),
    updated_date_at: new Date().toString("yyyy-MM-dd"),
    updated_time_at: new Date().toString("HH:mm:ss"),
    ...req.body
  }
  users.push(newPerson)
  res.status(201).json(newPerson)
})
app.patch("/person/:id", (req, res) => {
  const { id } = req.params
  const personIndex = users.findIndex(user => user.id === id)
  if (personIndex === -1) return res.status(404).json({ error: "person not found" })
  const result = validatePartialPerson(req.body)
  if (!result.success) return res.status(422).json({ error: result.error })

  const updatedPerson = {
    ...users[personIndex],
    ...req.body
  }
  users[updatedPerson] = updatedPerson
  res.status(200).json(updatedPerson)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PROTOCOL}://${HOST}:${PORT}`)
})
