const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers();

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get Users Success',
    data: result,
  });
});


const getUserById = catchAsync(async (req,res) =>{
  const result = await userService.getUserById(req.params.id)

  if(!result){
    throw new ApiError(httpStatus.NOT_FOUND, 'User ID not found')
  }

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get User Success',
    data: result
  })
})

const getUserByEmail = catchAsync(async (req,res) =>{
  const result = await userService.getUserByEmail(req.query.email)

  if(!result){
    throw new ApiError(httpStatus.NOT_FOUND, 'Email not found')
  }

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get User Success',
    data: result
  })
})

// const createUser = catchAsync(async (req,res) => {
//   const result = await userService.createUser(req.body);

//   res.status(httpStatus.CREATED).json({
//     status: httpStatus.CREATED,
//     message: 'Create User Success',
//     data: result
//   })
// })

const updateUser = catchAsync(async (req,res) =>{
  const userExist = await userService.getUserById(req.params.id)
  if(!userExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const result = await userService.updateUserById(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Update User Success',
    data: result
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userExist = await userService.getUserById(req.params.id)
  if(!userExist) throw new ApiError(httpStatus.NOT_FOUND, 'User Id not Found')

  await userService.deleteUserById(req.params.id);

  res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Delete User Success",
  });
})

const queryProductByUser = catchAsync(async (req,res) => {
  const product = await userService.queryProductByUser(req.params.id)
  if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not Found')

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Get Product by User Success",
    data: product
  })
})

const queryOrderByUser = catchAsync(async (req,res) => {
  const order = await userService.queryorderByUser(req.params.id)
  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not Found')

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Get Product by User Success",
    data: order
  })
})

module.exports = { getUsers, getUserByEmail, getUserById, updateUser, deleteUser, queryProductByUser, queryOrderByUser};
