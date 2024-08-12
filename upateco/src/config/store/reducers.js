import { combineReducers } from "redux";
import homeReducer from "../../containers/Home/Home.reducer";
import loginUserReducer from "../../containers/Login/Login.reducer";

export default combineReducers({
    home: homeReducer,
    loginUser: loginUserReducer
})
