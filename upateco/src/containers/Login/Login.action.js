import { makeActionCreator } from "../../config/store/utils"
import { getLoginUser, getProfileUser, getTokenUser } from "../../services/login"

export const GET_LOGIN_USER = 'GET_LOGIN_USER '
export const GET_LOGIN_USER_ERROR = 'GET_LOGIN_USER_ERROR'
export const GET_LOGIN_USER_SUCCESS = 'GET_LOGIN_USER_SUCCESS'
export const onGetLoginUser = makeActionCreator(GET_LOGIN_USER)
export const onGetLoginUserError = makeActionCreator(GET_LOGIN_USER_ERROR, 'payload')
export const onGetLoginUserSuccess = makeActionCreator(GET_LOGIN_USER_SUCCESS, 'payload')
export const onGetLoginUserThunk =
  ({ formData , onSuccessCallback}) =>
  async dispatch => {    
    dispatch(onGetLoginUser())

    try {
      const response = await getLoginUser({ actionType: GET_LOGIN_USER,  username: formData.username,  password: formData.password })

      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('username', formData.username);
      
      dispatch(
          onGetLoginUserSuccess()
        )
        dispatch(onGetTokenUserThunk({formData}))       
        onSuccessCallback()
    } catch (error) {
      return dispatch(
        onGetLoginUserError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

  export const GET_TOKEN_USER = 'GET_TOKEN_USER '
export const GET_TOKEN_USER_ERROR = 'GET_TOKEN_USER_ERROR'
export const GET_TOKEN_USER_SUCCESS = 'GET_TOKEN_USER_SUCCESS'
export const onGetTokenUser = makeActionCreator(GET_TOKEN_USER)
export const onGetTokenUserError = makeActionCreator(GET_TOKEN_USER_ERROR, 'payload')
export const onGetTokenUserSuccess = makeActionCreator(GET_TOKEN_USER_SUCCESS, 'payload')
export const onGetTokenUserThunk =
  ({ formData}) =>
  async dispatch => {    
    dispatch(onGetTokenUser())

    try {
      const response = await getTokenUser({ actionType: GET_TOKEN_USER,  username: formData.username,  password: formData.password })

      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('username', formData.username);
    
      dispatch(
          onGetTokenUserSuccess({access_token:response.token})
        ) 
        dispatch(onGetProfileUserThunk(response.token))      
      
    } catch (error) {
      return dispatch(
        onGetTokenUserError({
          error: {
            code: error.code,
            message: error.reason
          }
        })
      )
    }
  }

  export const GET_PROFILE_USER = 'GET_PROFILE_USER '
  export const GET_PROFILE_USER_ERROR = 'GET_PROFILE_USER_ERROR'
  export const GET_PROFILE_USER_SUCCESS = 'GET_PROFILE_USER_SUCCESS'
  export const onGetProfileUser = makeActionCreator(GET_PROFILE_USER)
  export const onGetProfileUserError = makeActionCreator(GET_PROFILE_USER_ERROR, 'payload')
  export const onGetProfileUserSuccess = makeActionCreator(GET_PROFILE_USER_SUCCESS, 'payload')
  export const onGetProfileUserThunk =
    (access_token) =>
    async dispatch => {    
      dispatch(onGetTokenUser())
  
      try {
        const response = await getProfileUser({ actionType: GET_TOKEN_USER,  access_token })    
        sessionStorage.setItem('profile', JSON.stringify(response?.data));
        dispatch(
          onGetProfileUserSuccess({profileUser:response?.data})
          )       
        
      } catch (error) {
        return dispatch(
          onGetTokenUserError({
            error: {
              code: error.code,
              message: error.reason
            }
          })
        )
      }
    }