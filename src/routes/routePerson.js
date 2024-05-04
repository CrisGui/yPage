import datejs from "datejs"

import { router } from "express"
import { validatePerson, validatePartialPerson } from "../scheme/validations.js"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const users = require("../../tests/MOCK_DATA.json")
export const routerPerson = Router()

routerPerson.get("/", (req, res) => {
  res.status(200).json(users)
})
routerPerson.get("/:id", (req, res) => {
  const { id } = req.params
  const personIndex = users.findIndex(user => user.id === id)
  if (personIndex === -1) return res.status(404).json({ error: "person not found" })
  res.status(200).json(users[personIndex])
})
routerPerson.post("/", (req, res) => {
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

routerPerson.patch("/:id", (req, res) => {
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
routerPerson.delete("/:id", (req, res) => {
  const { id } = req.params
  const personIndex = users.findIndex(user => user.id === id)
  if (personIndex === -1) return res.status(404).json({ error: "person not found" })

  users.splice(personIndex, 1)
  res.status(200)
})
