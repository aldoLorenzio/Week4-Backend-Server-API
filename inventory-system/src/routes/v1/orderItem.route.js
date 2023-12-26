const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const orderitemValidation = require('../../validations/orderItem.validation');
const orderitemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderitemValidation.createOrderItem), orderitemController.createOrderItem)
  .get(auth(), orderitemController.getOrderItems);

router
  .route('/:orderitemId')
  .get(auth(), validate(orderitemValidation.getOrderItem), orderitemController.getOrderItem)
  .patch(auth(), validate(orderitemValidation.updateOrderItem), orderitemController.updateOrderItem)
  .delete(auth(), validate(orderitemValidation.deleteOrderItem), orderitemController.deleteOrderItem);

module.exports = router;