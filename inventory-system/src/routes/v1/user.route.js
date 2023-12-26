const express = require('express');
const auth = require('../../middleware/auth')   
const userController = require('../../controllers/user.controller');
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation')

const router = express.Router();

router
    .get('/users', userController.getUsers)
    .get('/user', userController.getUserByEmail);

router
    .route('/:id')
    .get(auth(),validate(userValidation.getUser), userController.getUserById)
    .put(auth(), validate(userValidation.updateUser),userController.updateUser)
    .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser)
    .get(auth(), validate(userValidation.getUser), userController.queryProductByUser)
    .get(auth(), validate(userValidation.getUser), userController.queryOrderByUser)

module.exports = router;
