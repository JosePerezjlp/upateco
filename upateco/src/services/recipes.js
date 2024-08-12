import axios from "axios"

/**
 * All information from the supplier is brought
 */
export const getAllRecipes = async () => {

  const url = https://sandbox.academiadevelopers.com/reciperover/recipes/?page=${1}&page_zise=${3};

  const response = await axios.get(url)

  return response
};