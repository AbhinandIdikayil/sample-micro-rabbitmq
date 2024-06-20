import Joi from 'joi'

export const loginValidation = Joi.object({
    email:Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password:Joi
        .string()
        .required()
})