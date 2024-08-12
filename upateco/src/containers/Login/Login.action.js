import { makeActionCreator } from "../../config/store/utils"
import { getLoginUser } from "../../services/login"


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
      onSuccessCallback()
      dispatch(
          onGetLoginUserSuccess(response.token)
        )       
      
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