import Joi from 'joi';

export const secondFormValidator = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Zа-яА-ЯіІїЇ ]{1,100}$/).min(2).max(40).required().messages({
        'string.pattern.base': '*Невірно введено ім\'я',
        'string.min': '*min 2 літери',
        'string.max': '*max 40 літер',
        'string.empty': '*Це поле не може бути порожнім',
    }),
    phoneNumber: Joi.string().pattern(/^(\+?(38|48|39|34|49|1))?0\d{9}$/).required().messages({
        'string.pattern.base': '*Невірний номер телефону',
        'string.empty': '*Це поле не може бути порожнім',
    }),
    date: Joi.string().required()
})