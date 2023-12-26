// const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody,
  });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const getUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async(userId) => {
  const user = await prisma.user.findUnique({
    where:{ id: userId }
  })

  return user
}

const updateUserById = async (userId, userBody) => {

  userBody.password = bcrypt.hashSync(userBody.password, 8);

  const updateUser = await prisma.user.update({
      where: {
          id: userId,
      },
      data: userBody
  })

  return updateUser;
}

const deleteUserById = async (userId) => {
  const deleteUser = await prisma.user.delete({
      where: {
          id: userId
      },
  })

  return deleteUser
}

const queryProductByUser = async (userId) =>{
  const queryProduct = await prisma.user.findMany({
    where: {id : userId},
    include: {products: true}
  })
}

const queryOrderByUser = async (userId) => {
  const queryOrder = await prisma.user.findMany({
    where:{id: userId},
    include: {orders: true}
  })
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  queryProductByUser,
  queryOrderByUser
};
