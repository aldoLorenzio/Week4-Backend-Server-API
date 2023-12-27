const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    pasword: Joi.string().required(password),
    email: Joi.string().required()
  }),
};

const getUserByEmail ={
  query: Joi.object().keys({
    email: Joi.string().required().email()
  })
}

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      pasword: Joi.string().custom(password),
      email: Joi.string()
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUserByEmail,
  getUser,
  updateUser,
  deleteUser,
};