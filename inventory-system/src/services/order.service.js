const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBody) => {
  return prisma.order.create({
    data: orderBody
  })
}

// const createOrder = async (orderBody) => {
//   return prisma.order.create({
//     data: orderBody
//   });
// };


const queryOrders = async (filter, options) => {
  const orders = await prisma.order.findMany();
  return orders;
};

const getOrderById = async (id) => {
  return prisma.order.findFirst({
    where: {
      id: id
    }
  })
};

const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Id not found');
  }
  user
  const updateOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: updateBody
  })

  return updateOrder;
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const deleteOrders = await prisma.order.deleteMany({
    where: {
      id: orderId
    },
  })

  return deleteOrders;
};

const getOrderItems = async(orderId) => {
  const order = await prisma.order.findMany({
    where : {id: orderId} ,
    include: {orderItem : true}
  })

  return order
}


module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderItems
};