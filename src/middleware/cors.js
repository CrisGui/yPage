import cors from "cors"

const WHITELIST = [
  "https://ypage.com",
  "http://localhost:2350",
]
const METHODS = ["GET", "POST", "PUT", "PATCH"]

export const corsMiddleware = (acceptedOrigins = WHITELIST, allowMethods = METHODS) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error(/*"Not allowed by CORS"))*/`${origin} not allowed by CORS`))
    }
  },
  methods: allowMethods,
  optionsSuccessStatus: 204
})
