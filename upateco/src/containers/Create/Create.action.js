import { makeActionCreator } from "../../config/store/utils"
import { addStepInRecipe, createIngredientRecipe, createRecipe, getAllIngredients, getAllMeasures } from "../../services/createRecipe"


export const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS '
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR'
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS'
export const onGetAllIngredients = makeActionCreator(GET_ALL_INGREDIENTS)
export const onGetAllIngredientsError = makeActionCreator(GET_ALL_INGREDIENTS_ERROR, 'payload')
export const onGetAllIngredientsSuccess = makeActionCreator(GET_ALL_INGREDIENTS_SUCCESS, 'payload')
export const onGetAllIngredientsThunk =
  () =>
  async dispatch => {
    dispatch(onGetAllIngredients())

    try {
      const response = await getAllIngredients({ actionType: GET_ALL_INGREDIENTS })  
      
      const dataIngredient = response?.data?.results?.map(item => ({
        idIngredient: item.id,
        nameIngredient: item.name
      }))
      return dispatch(onGetAllIngredientsSuccess({data:dataIngredient}))    
      
      
    } catch (error) {
      return dispatch(
        onGetAllIngredientsError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

  export const CREATE_RECIPE = 'CREATE_RECIPE '
export const CREATE_RECIPE_ERROR = 'CREATE_RECIPE_ERROR'
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS'
export const onPostRecipe = makeActionCreator(CREATE_RECIPE)
export const onPostRecipeError = makeActionCreator(CREATE_RECIPE_ERROR, 'payload')
export const onPostRecipeSuccess = makeActionCreator(CREATE_RECIPE_SUCCESS, 'payload')
export const onPostRecipeThunk =
  ({   title,
    description,
    prepTime,
    cookTime,
    servings,
    ingredientsList,
    steps,
  access_token,onSuccessCallback}) =>
  async dispatch => {   
    dispatch(onPostRecipe())

    try {
      const response = await createRecipe({ actionType: CREATE_RECIPE, title,
        description,
        prepTime,
        cookTime,
        servings,
      access_token })  
      const idRecipe = response?.id;
      if (idRecipe) {      
        await dispatch(onPostIngredientsRecipeThunk({ ingredientsList, idRecipe, access_token }));   
        await dispatch(onAddStepRecipeThunk({ idRecipe, steps, access_token }));
        onSuccessCallback()
      } else {
        throw new Error('Recipe ID not found');
      }
      
    } catch (error) {
      return dispatch(
        onPostRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }


export const POST_INGREDIENTS_RECIPE = 'POST_INGREDIENTS_RECIPE '
export const POST_INGREDIENTS_RECIPE_ERROR = 'POST_INGREDIENTS_RECIPE_ERROR'
export const POST_INGREDIENTS_RECIPE_SUCCESS = 'POST_INGREDIENTS_RECIPE_SUCCESS'
export const onPostIngredientsRecipe = makeActionCreator(POST_INGREDIENTS_RECIPE)
export const onPostIngredientsRecipeError = makeActionCreator(POST_INGREDIENTS_RECIPE_ERROR, 'payload')
export const onPostIngredientsRecipeSuccess = makeActionCreator(POST_INGREDIENTS_RECIPE_SUCCESS, 'payload')
export const onPostIngredientsRecipeThunk =
  ({ingredientsList,idRecipe,access_token}) =>
  async dispatch => {
    dispatch(onPostIngredientsRecipe())

    try {
        const response = await Promise.all(
            ingredientsList.map(async (ingredient) => {
                const response = await createIngredientRecipe({
                    actionType: POST_INGREDIENTS_RECIPE,
                    idRecipe,
                    ingredient,
                    access_token
                });
                return response?.data; 
            })
        );  
   
       dispatch(onPostIngredientsRecipeSuccess({ detailRecipe:response?.data })) 
       dispatch(onGetAllIngredientsThunk())      
     
    } catch (error) {
      return dispatch(
        onPostIngredientsRecipeError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

  export const ADD_STEP_RECIPE = 'ADD_STEP_RECIPE '
  export const ADD_STEP_RECIPE_ERROR = 'ADD_STEP_RECIPE_ERROR'
  export const ADD_STEP_RECIPE_SUCCESS = 'ADD_STEP_RECIPE_SUCCESS'
  export const onAddStepRecipe = makeActionCreator(ADD_STEP_RECIPE)
  export const onAddStepRecipeError = makeActionCreator(ADD_STEP_RECIPE_ERROR, 'payload')
  export const onAddStepRecipeSuccess = makeActionCreator(ADD_STEP_RECIPE_SUCCESS, 'payload')
  export const onAddStepRecipeThunk =
    ({idRecipe,steps,access_token}) =>
    async dispatch => {
  
      dispatch(onAddStepRecipe())
  
      try {
        const response = await addStepInRecipe({ actionType: ADD_STEP_RECIPE, idRecipe,steps,access_token })   
       
         dispatch(onAddStepRecipeSuccess({ detailRecipe:response?.data }))       
       
      } catch (error) {
        return dispatch(
          onAddStepRecipeError({
            error: {
              code: error.code,
              message: error.reason
            }
          })
        )
      }
    }

    export const GET_MEASURE = 'GET_MEASURE '
    export const GET_MEASURE_ERROR = 'GET_MEASURE_ERROR'
    export const GET_MEASURE_SUCCESS = 'GET_MEASURE_SUCCESS'
    export const onGetMeasure = makeActionCreator(GET_MEASURE)
    export const onGetMeasureError = makeActionCreator(GET_MEASURE_ERROR, 'payload')
    export const onGetMeasureSuccess = makeActionCreator(GET_MEASURE_SUCCESS, 'payload')
    export const onGetMeasureThunk =
      () =>
      async dispatch => {
    
        dispatch(onGetMeasure())
    
        try {
          const response = await getAllMeasures({ actionType: GET_MEASURE })   
    
           dispatch(onGetMeasureSuccess({measure: response.data}))       
         
        } catch (error) {
          return dispatch(
            onGetMeasureError({
              error: {
                code: error.code,
                message: error.reason
              }
            })
          )
        }
      }