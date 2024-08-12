import axios from "axios"

/**
 * All information from the supplier is brought
 */
export const getAllRecipes = async () => {

  const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/?page=${1}&page_zise=${3}`;

  const response = await axios.get(url)

  return response
};
/**
 * All information from the supplier is brought
 */
export const getOneRecipe = async ({idRecipe}) => {
  console.log(idRecipe)
  const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${idRecipe}`;

  const response = await axios.get(url)

  return response
};

/**
* All information from the supplier is brought
*/
export const getAllIngredients = async ({ idRecipe }) => {
  const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${idRecipe}/ingredients/
`

  const response = await axios.get(url)
  
  return response
  
};

  /**
* All information from the supplier is brought
*/
  export const getIngredient = async ({ ingredient }) => {
  
    const url = `https://sandbox.academiadevelopers.com/reciperover/ingredients/${ingredient}/
`

    const response = await axios.get(url)
    
    return response
    
  };


      /**
* All information from the supplier is brought
*/
      export const getStepRecipe = async ({ idRecipe }) => {
  
        const url = `https://sandbox.academiadevelopers.com/reciperover/steps/${idRecipe}/
    `
    
        const response = await axios.get(url)
        
        return response
        
      };
