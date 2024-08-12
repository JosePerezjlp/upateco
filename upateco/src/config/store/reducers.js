import { combineReducers } from "redux";
import homeReducer from "../../containers/Home/Home.reducer";
import ingredientsReducer from "../../containers/DetailRecipe/DetailRecipe.reducer";
import loginUserReducer from "../../containers/Login/Login.reducer";

export default combineReducers({
    home: homeReducer,
    detailRecipe: ingredientsReducer,
    loginUser: loginUserReducer
})
