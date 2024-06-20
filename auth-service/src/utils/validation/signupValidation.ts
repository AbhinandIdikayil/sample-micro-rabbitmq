import Joi from 'joi'

export const  signupValidation = Joi.object({
    name:Joi
        .string()
        .required()
        .min(4)
        .alphanum(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi
        .string()
        .required()
})