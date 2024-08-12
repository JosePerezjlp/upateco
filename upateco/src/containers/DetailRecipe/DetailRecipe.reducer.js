import { GET_ONE_INGREDIENTS_RECIPE, GET_ONE_INGREDIENTS_RECIPE_ERROR, GET_ONE_INGREDIENTS_RECIPE_SUCCESS, GET_STEP_RECIPE, GET_STEP_RECIPE_ERROR, GET_STEP_RECIPE_SUCCESS } from './DetailRecipe.action';

  
  const ingredientsProviderState = { 
    ingredients: [],
    step:{}
  }
  
  /**
   * The ingredients reducer provider's reducer.
   */
  const ingredientsReducer = (state = ingredientsProviderState, {payload,type}) => {
    switch (type) {
        case GET_ONE_INGREDIENTS_RECIPE:
          case GET_STEP_RECIPE:           
          return {
            ...state,
            loading: true,
            error: null,
          };
 
        case GET_ONE_INGREDIENTS_RECIPE_ERROR:           
        case GET_STEP_RECIPE_ERROR:
          return {
            ...state,
            loading: false,
            error: payload.error,
          }

            case GET_ONE_INGREDIENTS_RECIPE_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  ingredients: payload.ingredients,
                };
                case GET_STEP_RECIPE_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    step: payload.step,
                  };
        default:
          return state;
      }
    };
    
  
  export default ingredientsReducer
  