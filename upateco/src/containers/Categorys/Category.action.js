import { makeActionCreator } from "../../config/store/utils"
import { getAllCategorys, getOneCategorys } from "../../services/categorys"
import { getOneRecipe } from "../../services/recipes"

export const GET_ALL_CATEGORYS = 'GET_ALL_CATEGORYS '
export const GET_ALL_CATEGORYS_ERROR = 'GET_ALL_CATEGORYS_ERROR'
export const GET_ALL_CATEGORYS_SUCCESS = 'GET_ALL_CATEGORYS_SUCCESS'
export const onGetAllCategory = makeActionCreator(GET_ALL_CATEGORYS)
export const onGetAllCategoryError = makeActionCreator(GET_ALL_CATEGORYS_ERROR, 'payload')
export const onGetAllCategorySuccess = makeActionCreator(GET_ALL_CATEGORYS_SUCCESS, 'payload')
export const onGetAllCategoryThunk =
  () =>
  async dispatch => {
    dispatch(onGetAllCategory())

    try {
      const response = await getAllCategorys({ actionType: GET_ALL_CATEGORYS })  
      const dataCategory = response?.data?.results?.map(item => ({
        idCategory: item.id,
        nameCategory: item.name
      }))
      return dispatch(onGetAllCategorySuccess({data:dataCategory}))    
      
      
    } catch (error) {
      return dispatch(
        onGetAllCategoryError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }


  export const GET_ONE_CATEGORY = 'GET_ONE_CATEGORY '
  export const GET_ONE_CATEGORY_ERROR = 'GET_ONE_CATEGORY_ERROR'
  export const GET_ONE_CATEGORY_SUCCESS = 'GET_ONE_CATEGORY_SUCCESS'
  export const onGetOneCategory = makeActionCreator(GET_ONE_CATEGORY)
  export const onGetOneCategoryError = makeActionCreator(GET_ONE_CATEGORY_ERROR, 'payload')
  export const onGetOneCategorySuccess = makeActionCreator(GET_ONE_CATEGORY_SUCCESS, 'payload')
  export const onGetOneCategoryThunk =
    (idCategory) =>
    async dispatch => {
    
      dispatch(onGetOneCategory())
  
      try {
        const response = await getOneCategorys({ actionType: GET_ONE_CATEGORY, idCategory })

         dispatch(onGetRecipesInCategoryThunk(response.data.recipes))   
         dispatch(onGetOneCategorySuccess())  
              
        
      } catch (error) {
        return dispatch(
          onGetOneCategoryError({
            error: {
              code: error.code,
              message: error.reason
            }
          })
        )
      }
    }

    export const GET_RECIPES_IN_CATEGORY = 'GET_RECIPES_IN_CATEGORY '
    export const GET_RECIPES_IN_CATEGORY_ERROR = 'GET_RECIPES_IN_CATEGORY_ERROR'
    export const GET_RECIPES_IN_CATEGORY_SUCCESS = 'GET_RECIPES_IN_CATEGORY_SUCCESS'
    export const onGetRecipesInCategory = makeActionCreator(GET_RECIPES_IN_CATEGORY)
    export const onGetRecipesInCategoryError = makeActionCreator(GET_RECIPES_IN_CATEGORY_ERROR, 'payload')
    export const onGetRecipesInCategorySuccess = makeActionCreator(GET_RECIPES_IN_CATEGORY_SUCCESS, 'payload')
    export const onGetRecipesInCategoryThunk =
      dataCategory =>
      async dispatch => {
        
        dispatch(onGetRecipesInCategory())
    
        try {
          const results = []
          for (const id of dataCategory) {
       
            const response = await getOneRecipe({ actionType: GET_RECIPES_IN_CATEGORY, idRecipe: id });
            results.push(response.data);
          }        
         
          return dispatch(onGetRecipesInCategorySuccess({recipes:results}))    
          
          
        } catch (error) {
          return dispatch(
            onGetRecipesInCategoryError({
              error: {
                code: error.code,
                message: error.reason
              }
            })
          )
        }
      }