const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createOrderItem = async (orderItemBody) => {
  // Get data orderId and productId
  const order = await prisma.order.findUnique({
    where:{
      id: orderItemBody.orderId
    }
  })

  const product = await prisma.product.findUnique({
    where:{
      id: orderItemBody.productId
    }
  })

  //Validation error
  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order ID not found');
  if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product ID not found');
  if(orderItemBody.quantity > product.quantityInStock) throw new ApiError (httpStatus.BAD_REQUEST, `Order quantity exceed product stock. Current product stock is ${product.quantityInStock}`);

  //Update quantity product and Total price in order
  await prisma.product.update({
    where:{
      id: product.id
    },
    data: {quantityInStock: product.quantityInStock - orderItemBody.quantity}
  });

  await prisma.order.update({
    where:{id: order.id},
    data: {totalPrice: orderItemBody.quantity * orderItemBody.unitPrice}
  })

  //Create orderItem
  return prisma.orderItem.create({
    data: orderItemBody
  });
};


const queryOrderItems = async (filter, options) => {
  const orderItems = await prisma.orderItem.findMany();
  return orderItems;
};

const getOrderItemById = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id
    }
  })
};

const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }
  user
  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody
  })

  return updateOrderItem;
};

const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found');
  }

  const deleteOrderItems = await prisma.orderItem.deleteMany({
    where: {
      id: orderItemId
    },
  })

  return deleteOrderItems;
};

module.exports = {
  createOrderItem,
  queryOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};