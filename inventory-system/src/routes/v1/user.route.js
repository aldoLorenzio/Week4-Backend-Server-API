const express = require('express');
const auth = require('../../middleware/auth')   
const userController = require('../../controllers/user.controller');
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation')

const router = express.Router();

router
    .route('/')
    .get(auth() ,userController.getUsers);
    
    router
    .route('/:userId')
    .get(auth(),validate(userValidation.getUser), userController.getUserById)
    .patch(auth(), validate(userValidation.updateUser),userController.updateUser)
    .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser);
    
    router
    .route('/:userId/products')
    .get(auth(), userController.queryProductByUser)
    
    router
    .route('/:userId/orders')
    .get(auth(), userController.queryOrderByUser)
    
    
        
    module.exports = router;
    