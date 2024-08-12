import { GET_LOGIN_USER, GET_LOGIN_USER_ERROR, GET_LOGIN_USER_SUCCESS } from './Login.action'
  
  const loginUserProviderState = {
    access_token: '',
    login: false
  }
  
  /**
   * The login reducer provider's reducer.
   */
  const loginUserReducer = (state = loginUserProviderState, { payload, type }) => {
    switch (type) {     
      case GET_LOGIN_USER: {
        return { ...state, loading: false }
      }
      case GET_LOGIN_USER_ERROR: {
        return { ...state, loading: false, }
      }
      case GET_LOGIN_USER_SUCCESS: {
        return {
            ...state,
            login: true,
            access_token: payload          
          }
      }    
  
      default: {
        return state
      }
    }
  }
  
  export default loginUserReducer