import { makeActionCreator } from "../../config/store/utils"
import { getAllIngredients, getAllRecipes, getOneRecipe } from "../../services/recipes"
import { onGetOneIngredientsRecipeThunk, onGetStepRecipeThunk } from "../DetailRecipe/DetailRecipe.action"

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES '
export const GET_ALL_RECIPES_ERROR = 'GET_ALL_RECIPES_ERROR'
export const GET_ALL_RECIPES_SUCCESS = 'GET_ALL_RECIPES_SUCCESS'
export const onGetAllRecipes = makeActionCreator(GET_ALL_RECIPES)
export const onGetAllRecipesError = makeActionCreator(GET_ALL_RECIPES_ERROR, 'payload')
export const onGetAllRecipesSuccess = makeActionCreator(GET_ALL_RECIPES_SUCCESS, 'payload')
export const onGetAllRecipesThunk =
  () =>
  async dispatch => {
  
    dispatch(onGetAllRecipes())

    try {
      const response = await getAllRecipes({ actionType: GET_ALL_RECIPES })    
      return dispatch(
          onGetAllRecipesSuccess({data:response.data.results})
        )       
      
    } catch (error) {
      return dispatch(
        onGetAllRecipesError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

export const GET_DETAIL_RECIPE = 'GET_DETAIL_RECIPE '
export const GET_DETAIL_RECIPE_ERROR = 'GET_DETAIL_RECIPE_ERROR'
export const GET_DETAIL_RECIPE_SUCCESS = 'GET_DETAIL_RECIPE_SUCCESS'
export const onGetDetailRecipe = makeActionCreator(GET_DETAIL_RECIPE)
export const onGetDetailRecipeError = makeActionCreator(GET_DETAIL_RECIPE_ERROR, 'payload')
export const onGetDetailRecipeSuccess = makeActionCreator(GET_DETAIL_RECIPE_SUCCESS, 'payload')
export const onGetDetailRecipeThunk =
  (idRecipe) =>
  async dispatch => {

    dispatch(onGetDetailRecipe())

    try {
      const response = await getOneRecipe({ actionType: GET_DETAIL_RECIPE, idRecipe })   
   
       dispatch(onGetDetailRecipeSuccess({ detailRecipe:response?.data }))       
       dispatch(onGetAllIngredientsRecipeThunk(idRecipe))
       dispatch(onGetStepRecipeThunk(idRecipe))       
    } catch (error) {
      return dispatch(
        onGetDetailRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

export const GET_ALL_INGREDIENTS_RECIPE = 'GET_ALL_INGREDIENTS_RECIPE '
export const GET_ALL_INGREDIENTS_RECIPE_ERROR = 'GET_ALL_INGREDIENTS_RECIPE_ERROR'
export const GET_ALL_INGREDIENTS_RECIPE_SUCCESS = 'GET_ALL_INGREDIENTS_RECIPE_SUCCESS'
export const onGetAllIngredientsRecipe = makeActionCreator(GET_ALL_INGREDIENTS_RECIPE)
export const onGetAllIngredientsRecipeError = makeActionCreator(GET_ALL_INGREDIENTS_RECIPE_ERROR, 'payload')
export const onGetAllIngredientsRecipeSuccess = makeActionCreator(GET_ALL_INGREDIENTS_RECIPE_SUCCESS, 'payload')
export const onGetAllIngredientsRecipeThunk =
  (idRecipe) =>
  async dispatch => {
    dispatch(onGetAllIngredientsRecipe())

    try {
      const response = await getAllIngredients({ actionType: GET_ALL_INGREDIENTS_RECIPE, idRecipe })  
    
      dispatch(onGetOneIngredientsRecipeThunk(response.data.results))    
      dispatch(onGetAllIngredientsRecipeSuccess())     
      
    } catch (error) {
      return dispatch(
        onGetAllIngredientsRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }