import axios from "axios";

/**
 * All information from the supplier is brought
 */
export const getAllIngredients = async () => {

    const url = `https://sandbox.academiadevelopers.com/reciperover/ingredients/`;
  
    const response = await axios.get(url)
  
    return response
  };

  /**
 * All information from the supplier is brought
 */
  export const updateRecipe = async ({idRecipe,
    title,
    description,
    preparationTime,
    cookingTime,
    servings,
    access_token}) => {
        console.log(idRecipe,
            title,
            description,
            preparationTime,
            cookingTime,
            servings,
            access_token)
    const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${idRecipe}/
`

    const response = await axios.put(
        url,
        {
         title: title,      
         description: description,
         preparation_time: preparationTime,
         cooking_time: cookingTime,
         servings: servings
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${access_token}`
          }
        }
      );
  
      return response.data;
    
  };

  export const deleteIngredient = async ({idRecipe,idIngredient,access_token}) => {

    const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${idRecipe}/ingredients/${idIngredient}/`;
  
    const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${access_token}`
        }
      });
      
      return response;
  };