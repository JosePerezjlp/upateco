import { GET_ALL_CATEGORYS, GET_ALL_CATEGORYS_ERROR, GET_ALL_CATEGORYS_SUCCESS, GET_RECIPES_IN_CATEGORY_SUCCESS } from './Category.action';
  
  const categoryProviderState = { 
    data: [],
    recipes: []   
  }
  
  /**
   * The ingredients reducer provider's reducer.
   */
  const categoryReducer = (state = categoryProviderState, {payload,type}) => {
    switch (type) {
        case GET_ALL_CATEGORYS:              
          return {
            ...state,
            loading: true,
            error: null,
          };
 
        case GET_ALL_CATEGORYS_ERROR:     
          return {
            ...state,
            loading: false,
            error: payload.error,
          }

            case GET_ALL_CATEGORYS_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  data: payload.data,
                };    
                case GET_RECIPES_IN_CATEGORY_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    recipes: payload.recipes,
                  };        
        default:
          return state;
      }
    };
    
  
  export default categoryReducer