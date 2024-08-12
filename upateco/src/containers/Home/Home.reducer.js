import { GET_ALL_INGREDIENTS_RECIPE_SUCCESS, GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR, GET_ALL_RECIPES_SUCCESS, GET_DETAIL_RECIPE, GET_DETAIL_RECIPE_ERROR, GET_DETAIL_RECIPE_SUCCESS } from './Home.action'
  
  const homeProviderState = {
    data: [],
    loading: false,
    detailRecipe: {},
    ingredients: []
  }
  
  /**
   * The home reducer provider's reducer.
   */
  const homeReducer = (state = homeProviderState, {payload,type}) => {
    switch (type) {
        case GET_ALL_RECIPES:
            case GET_DETAIL_RECIPE:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case GET_ALL_RECIPES_SUCCESS:
          return {
            ...state,
            loading: false,
            data: payload.data,
          };
        case GET_ALL_RECIPES_ERROR:
            case GET_DETAIL_RECIPE_ERROR:
          return {
            ...state,
            loading: false,
            error: payload.error,
          }
          case GET_DETAIL_RECIPE_SUCCESS:
            return {
              ...state,
              loading: false,
              detailRecipe: payload.detailRecipe,
            };
            case GET_ALL_INGREDIENTS_RECIPE_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  ingredients: payload.ingredients,
                };
        default:
          return state;
      }
    };
    
  
  export default homeReducer
  