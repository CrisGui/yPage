import zod from "zod"

const schemePerson = zod.object({
  fullname: zod.string()
    .max(255)
    .min(1),
  firstname: zod.string()
    .max(255)
    .min(1),
  lastname: zod.string()
    .max(255)
    .min(1),
  birthday: zod.string()
    .date()
    .max(new Date("1900-01-01"))
    .min(new Date()),
  phone: zod.string()
    .max(12)
    .min(9)
    .optional(),
  email: zod.string()
    .email()
    .max(255)
    .min(3),
  address: zod.string()
    .max(255)
    .min(1)
    .optional(),
  workAt: zod.string()
    .max(255)
    .min(1)
    .optional(),
})

export function validatePerson(shape) {
  return schemePerson.safeParse(shape)
}

export function validatePartialPerson(shape) {
  return schemePerson.partial().safeParse(shape)
}
