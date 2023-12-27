const express = require('express');
const auth = require('../../middleware/auth')   
const userController = require('../../controllers/user.controller');
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation')

const router = express.Router();

router
    .route('/')
    .get(auth() ,userController.getUsers);

//route for req query email
router
    .route('/user')
    .get(auth(), validate(userValidation.getUserByEmail), userController.getUserByEmail);
    
    router
    .route('/:userId')
    .get(auth(),validate(userValidation.getUser), userController.getUserById)
    .patch(auth(), validate(userValidation.updateUser),userController.updateUser)
    .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser)
    .get(auth(), validate(userValidation.getUser), userController.queryProductByUser)
    .get(auth(), validate(userValidation.getUser), userController.queryOrderByUser);
    
        
    module.exports = router;
    