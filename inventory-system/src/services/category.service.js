const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createCategory = async (categoryBody) => {
  return prisma.category.create({
    data: categoryBody
  });
};


const queryCategorys = async (filter, options) => {
  const categorys = await prisma.category.findMany();
  return categorys;
};

const getCategoryById = async (id) => {
  return prisma.category.findFirst({
    where: {
      id: id
    }
  })
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  
  const updateCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: updateBody
  })

  return updateCategory;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const deleteCategorys = await prisma.category.deleteMany({
    where: {
      id: categoryId
    },
  })

  return deleteCategorys;
};

module.exports = {
  createCategory,
  queryCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};