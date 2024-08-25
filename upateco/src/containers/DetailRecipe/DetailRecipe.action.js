import { makeActionCreator } from "../../config/store/utils"
import { getDeleteRecipe, getIngredient, getStepRecipe } from "../../services/recipes"


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


export const DELETE_ONE_RECIPE = 'DELETE_ONE_RECIPE '
export const DELETE_ONE_RECIPE_ERROR = 'DELETE_ONE_RECIPE_ERROR'
export const DELETE_ONE_RECIPE_SUCCESS = 'DELETE_ONE_RECIPE_SUCCESS'
export const onDeleteOneRecipe = makeActionCreator(DELETE_ONE_RECIPE)
export const onDeleteOneRecipeError = makeActionCreator(DELETE_ONE_RECIPE_ERROR, 'payload')
export const onDeleteOneRecipeSuccess = makeActionCreator(DELETE_ONE_RECIPE_SUCCESS, 'payload')
export const onDeleteOneRecipeThunk =
  ({idRecipe, access_token,
    onSuccessCallback}) =>
  async dispatch => {
  
    dispatch(onDeleteOneRecipe())

    try {
      const response = await getDeleteRecipe({ actionType: DELETE_ONE_RECIPE, idRecipe, access_token })  
      console.log(response)  
      onSuccessCallback()
    } catch (error) {      
      return dispatch(
        onDeleteOneRecipeError({
          error: {
            code: error.code           
          },
          message: error.response.data.detail
        })
      )
    }
  }