import { GET_LOGIN_USER, GET_LOGIN_USER_ERROR, GET_LOGIN_USER_SUCCESS, GET_PROFILE_USER, GET_PROFILE_USER_ERROR, GET_PROFILE_USER_SUCCESS, GET_TOKEN_USER, GET_TOKEN_USER_ERROR, GET_TOKEN_USER_SUCCESS } from './Login.action'
  
  const loginUserProviderState = {
    access_token: '',
    login: false,
    profileUser: []
  }
  
  /**
   * The login reducer provider's reducer.
   */
  const loginUserReducer = (state = loginUserProviderState, { payload, type }) => {
    switch (type) {     
      case GET_LOGIN_USER:
      case GET_TOKEN_USER:
        case GET_PROFILE_USER
        : {
        return { ...state, loading: false }
      }
      case GET_LOGIN_USER_ERROR:
        case GET_TOKEN_USER_ERROR:
          case GET_PROFILE_USER_ERROR: {
        return { ...state, loading: false, }
      }
      case GET_LOGIN_USER_SUCCESS: {
        return {
            ...state,
            login: true            
          }
      } 
      case GET_TOKEN_USER_SUCCESS: {
        return {
            ...state,         
            access_token: payload.access_token          
          }
      }   
      case GET_PROFILE_USER_SUCCESS: {
        return {
            ...state,         
            profileUser: payload.profileUser          
          }
      }   
  
      default: {
        return state
      }
    }
  }
  
  export default loginUserReducer