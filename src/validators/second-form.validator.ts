import Joi from 'joi';

export const secondFormValidator = Joi.object({
    name: Joi.string().min(2).max(100),
    phoneNumber: Joi.string().pattern(/^(\+?38)?0\d{9}$/).required().messages({
        'string.pattern.base': 'no'
    }),
    date: Joi.string().required()
})