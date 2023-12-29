const Joi = require('joi');
const { password, notAdmin } = require('./custom.validation');

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().custom(notAdmin)
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = {
    register,
    login,
}