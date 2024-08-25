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
  export const createRecipe = async ({title,
    description,
    prepTime,
    cookTime,
    servings,
  access_token}) => {
    const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/
`

    const response = await axios.post(
        url,
        {
         title: title,      
         description: description,
         preparation_time: prepTime,
         cooking_time: cookTime,
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
  

    /**
 * All information from the supplier is brought
 */
    export const createIngredientRecipe = async ({idRecipe,ingredient,access_token}) => {
   
      const url = `https://sandbox.academiadevelopers.com/reciperover/recipes/${idRecipe}/ingredients/`
  
      const response = await axios.post(
          url,
          {
    quantity: ingredient.cantidad,
  measure: ingredient.unidad,
  recipe: idRecipe,
  ingredient: ingredient.idIngredient
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

        /**
 * All information from the supplier is brought
 */
        export const addStepInRecipe = async ({idRecipe, steps, access_token}) => {
          const url = `https://sandbox.academiadevelopers.com/reciperover/steps/`
      
          const response = await axios.post(
              url,
              {
            order: 2,
            instruction: steps,
            recipe: idRecipe
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