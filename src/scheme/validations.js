import zod from "zod"

const schemePerson = zod.object({
  fullname: zod.string({
    required_error: "fullname is required",
    invalid_type_error: "fullname must be a string",
  })
    .max(511)
    .min(1),
  firstname: zod.string({
    required_error: "firstname is required",
    invalid_type_error: "firstname must be a string",
  })
    .max(255)
    .min(1),
  lastname: zod.string({
    required_error: "lastname is required",
    invalid_type_error: "lastname must be a string",
  })
    .max(255)
    .min(1),
  /*birthday: zod.string()
    .date()
    .max(new Date("1900-01-01"))
    .min(new Date()),
  phone: zod.string()
    .max(12)
    .min(9)
    .optional(),*/
  email: zod.string({
    required_error: "email is required",
    invalid_type_error: "email must be a valid email address",
  })
    .email()
    .max(255)
    .min(3),
  gender: zod.enum(["Male", "Female"], {
    required_error: "gender is required",
    invalid_type_error: "gender must be either Male or Female",
  }),
  avatar: zod.string({
    required_error: "avatar is required",
    invalid_type_error: "avatar must be a valid url to a image file",
  }).url().max(255).min(5),
  username: zod.string({
    required_error: "username is required",
    invalid_type_error: "username must be a string",
  })
    .max(255)
    .min(1),
  password: zod.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  })
    .max(255)
    .min(1),
  password_hash: zod.string({
    required_error: "password hash is required",
    invalid_type_error: "password hash must be a string",
  })
    .max(255)
    .min(1),
  company: zod.string({
    required_error: "company is required",
    invalid_type_error: "company must be a string",
  })
    .max(255)
    .min(1),
  department: zod.string({
    required_error: "department is required",
    invalid_type_error: "department must be a string",
  })
    .max(255)
    .min(1),
  job: zod.string({
    required_error: "job is required",
    invalid_type_error: "job must be a string",
  })
    .max(255)
    .min(1),
  country: zod.string({
    required_error: "country is required",
    invalid_type_error: "country must be a string",
  })
    .max(255)
    .min(1),
  state: zod.string({
    required_error: "state is required",
    invalid_type_error: "state must be a string",
  })
    .max(255)
    .min(1),
  city: zod.string({
    required_error: "city is required",
    invalid_type_error: "city must be a string",
  })
    .max(255)
    .min(1),
  address_line: zod.string({
    required_error: "address line is required",
    invalid_type_error: "address line must be a string",
  })
    .max(255)
    .min(1),
  address_street: zod.string({
    required_error: "address street is required",
    invalid_type_error: "address street must be a string",
  })
    .max(255)
    .min(1),
  linkedln_profile: zod.string({
    required_error: "linkedln profile is required",
    invalid_type_error: "linkedln profile must be a valid url",
  }).url().max(255).min(5),
})

export function validatePerson(shape) {
  return schemePerson.safeParse(shape)
}

export function validatePartialPerson(shape) {
  return schemePerson.partial().safeParse(shape)
}
