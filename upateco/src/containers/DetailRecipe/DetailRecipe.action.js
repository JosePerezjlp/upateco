import { makeActionCreator } from "../../config/store/utils"
import { getIngredient, getStepRecipe } from "../../services/recipes"


export const GET_ONE_INGREDIENTS_RECIPE = 'GET_ONE_INGREDIENTS_RECIPE '
export const GET_ONE_INGREDIENTS_RECIPE_ERROR = 'GET_ONE_INGREDIENTS_RECIPE_ERROR'
export const GET_ONE_INGREDIENTS_RECIPE_SUCCESS = 'GET_ONE_INGREDIENTS_RECIPE_SUCCESS'
export const onGetOneIngredientsRecipe = makeActionCreator(GET_ONE_INGREDIENTS_RECIPE)
export const onGetOneIngredientsRecipeError = makeActionCreator(GET_ONE_INGREDIENTS_RECIPE_ERROR, 'payload')
export const onGetOneIngredientsRecipeSuccess = makeActionCreator(GET_ONE_INGREDIENTS_RECIPE_SUCCESS, 'payload')
export const onGetOneIngredientsRecipeThunk =
 ( data )=>
  async dispatch => {
  
    dispatch(onGetOneIngredientsRecipe())

    try {

      const results = []
      for (const item of data) {
        const response = await getIngredient({ actionType: GET_ONE_INGREDIENTS_RECIPE, ingredient: item.ingredient })
        results.push(response.data) 
      }
      const updatedData = data.map(item => {
        const result = results.find(res => res.id === item.ingredient) 
        if (result) {
          return {
            ...item,              
            name: result.name, 
            id: result.id         
          }
        }
        return item 
      })

      return dispatch(
        onGetOneIngredientsRecipeSuccess({ingredients:updatedData})
      )

    } catch (error) {
      return dispatch(
        onGetOneIngredientsRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

  export const GET_STEP_RECIPE = 'GET_STEP_RECIPE '
export const GET_STEP_RECIPE_ERROR = 'GET_STEP_RECIPE_ERROR'
export const GET_STEP_RECIPE_SUCCESS = 'GET_STEP_RECIPE_SUCCESS'
export const onGetStepRecipe = makeActionCreator(GET_STEP_RECIPE)
export const onGetStepRecipeError = makeActionCreator(GET_STEP_RECIPE_ERROR, 'payload')
export const onGetStepRecipeSuccess = makeActionCreator(GET_STEP_RECIPE_SUCCESS, 'payload')
export const onGetStepRecipeThunk =
  (idRecipe) =>
  async dispatch => {
    console.log(idRecipe)
    dispatch(onGetStepRecipe())

    try {
      const response = await getStepRecipe({ actionType: GET_STEP_RECIPE, idRecipe })  
  
      return dispatch(onGetStepRecipeSuccess({step:response.data}))    
      
      
    } catch (error) {
      return dispatch(
        onGetStepRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }