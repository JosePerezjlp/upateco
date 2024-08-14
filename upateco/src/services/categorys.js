import axios from "axios"

/**
 * All information from the supplier is brought
 */
export const getAllCategorys = async () => {

  const url = `https://sandbox.academiadevelopers.com/reciperover/categories/?page=${1}&page_zise=${3}`;

  const response = await axios.get(url)

  return response
};

/**
 * All information from the supplier is brought
 */
export const getOneCategorys = async ({idCategory}) => {

  const url = `https://sandbox.academiadevelopers.com/reciperover/categories/${idCategory}/`;

  const response = await axios.get(url)

  return response
};