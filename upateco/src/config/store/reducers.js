import { combineReducers } from "redux";
import homeReducer from "../../containers/Home/Home.reducer";
import categoryReducer from "../../containers/Categorys/Category.reducer";
import createReducer from "../../containers/Create/Create.reducer";
import ingredientsReducer from "../../containers/DetailRecipe/DetailRecipe.reducer";
import loginUserReducer from "../../containers/Login/Login.reducer";

export default combineReducers({
    home: homeReducer,
    category: categoryReducer,
    createRecipe: createReducer,
    detailRecipe: ingredientsReducer,
    loginUser: loginUserReducer
})
