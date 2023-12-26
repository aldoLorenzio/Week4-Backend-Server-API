const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderitemService } = require('../services');

const createOrderItem = catchAsync(async (req, res) => {
  const orderitem = await orderitemService.createOrderItem(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create OrderItem Success",
    data: orderitem
  });
});

const getOrderItems = catchAsync(async (req, res) => {
  const result = await orderitemService.queryOrderItems();
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get OrderItems Success",
    data: result
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  const orderitem = await orderitemService.getOrderItemById(req.params.orderitemId);
  if (!orderitem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get OrderItem Success",
    data: orderitem
  });
});


const updateOrderItem = catchAsync(async (req, res) => {
  const orderitem = await orderitemService.updateOrderItemById(req.params.orderitemId, req.body);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update OrderItem Success",
    data: orderitem
  });
});

const deleteOrderItem = catchAsync(async (req, res) => {
  await orderitemService.deleteOrderItemById(req.params.orderitemId);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete OrderItem Success",
    data: null
  });
});

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
};