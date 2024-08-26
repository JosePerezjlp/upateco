import { GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_ERROR, GET_ALL_INGREDIENTS_SUCCESS, GET_MEASURE_SUCCESS } from './Create.action';
  
  const createProviderState = { 
    data: [],
    measure: []     
  }
  
  /**
   * The ingredients reducer provider's reducer.
   */
  const createReducer = (state = createProviderState, {payload,type}) => {
    switch (type) {
        case GET_ALL_INGREDIENTS:              
          return {
            ...state,
            loading: true,
            error: null,
          };
 
        case GET_ALL_INGREDIENTS_ERROR:     
          return {
            ...state,
            loading: false,
            error: payload.error,
          }

            case GET_ALL_INGREDIENTS_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  data: payload.data,
                };
                case GET_MEASURE_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    measure: payload.measure,
                  };                       
        default:
          return state;
      }
    };
    
  
  export default createReducer
  