import Joi from 'joi';

export const secondFormValidator = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Zа-яА-ЯіІїЇ ]{1,100}$/).min(2).max(40).required().messages({
        'string.pattern.base': 'Вкажіть імʼя літерами',
        'string.min': 'Імʼя має містити щонайменше 2 літери',
        'string.max': 'Імʼя має містити не більше 40 літер',
        'string.empty': 'Це поле обовʼязкове',
    }),
    phoneNumber: Joi.string().pattern(/^(\+?(38|48|39|34|49|1))?0\d{9}$/).required().messages({
        'string.pattern.base': 'Вкажіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX',
        'string.empty': 'Це поле обовʼязкове',
    }),
    date: Joi.string().required().messages({
        'string.empty': 'Оберіть бажану дату',
    })
})
