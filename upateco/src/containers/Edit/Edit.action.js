import { makeActionCreator } from "../../config/store/utils";
import { createIngredientRecipe } from "../../services/createRecipe";
import { deleteIngredient, updateRecipe } from "../../services/editRecipe";

export const UPDATE_RECIPE = "UPDATE_RECIPE ";
export const UPDATE_RECIPE_ERROR = "UPDATE_RECIPE_ERROR";
export const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
export const onUpdateRecipe = makeActionCreator(UPDATE_RECIPE);
export const onUpdateRecipeError = makeActionCreator(
  UPDATE_RECIPE_ERROR,
  "payload"
);
export const onUpdateRecipeSuccess = makeActionCreator(
  UPDATE_RECIPE_SUCCESS,
  "payload"
);
export const onUpdateRecipeThunk =
  ({
    idRecipe,
    title,
    description,
    preparationTime,
    cookingTime,
    servings,
    access_token,
  }) =>
  async (dispatch) => {
    dispatch(
      onUpdateRecipe(
        idRecipe,
        title,
        description,
        preparationTime,
        cookingTime,
        servings,
        access_token
      )
    );

    try {
      const response = await updateRecipe({
        actionType: UPDATE_RECIPE,
        idRecipe,
        title,
        description,
        preparationTime,
        cookingTime,
        servings,
        access_token,
      });
   
      if (idRecipe) {
        await dispatch(
          onPostOneIngredientThunk({ ingredientsList, idRecipe, access_token })
        );
        await dispatch(onDeleteIngredientThunk({ idRecipe, steps, access_token }));
        onSuccessCallback();
      } else {
        throw new Error("Recipe ID not found");
      }
    } catch (error) {
      return dispatch(
        onUpdateRecipeError({
          error: {
            code: error.code,
            message: error.reason,
          },
        })
      );
    }
  };

//   export const POST_ONE_INGREDIENT = 'POST_ONE_INGREDIENT '
// export const POST_ONE_INGREDIENT_ERROR = 'POST_ONE_INGREDIENT_ERROR'
// export const POST_ONE_INGREDIENT_SUCCESS = 'POST_ONE_INGREDIENT_SUCCESS'
// export const onPostOneIngredient = makeActionCreator(POST_ONE_INGREDIENT)
// export const onPostOneIngredientError = makeActionCreator(POST_ONE_INGREDIENT_ERROR, 'payload')
// export const onPostOneIngredientSuccess = makeActionCreator(POST_ONE_INGREDIENT_SUCCESS, 'payload')
// export const onPostOneIngredientThunk =
//   ({ingredientsList,idRecipe,access_token}) =>
//   async dispatch => {
//     dispatch(onPostOneIngredient())

//     try {
//         const response = await Promise.all(
//             ingredientsList.map(async (ingredient) => {
//                 const response = await createIngredientRecipe({
//                     actionType: POST_ONE_INGREDIENT,
//                     idRecipe,
//                     ingredient,
//                     access_token
//                 });
//                 return response?.data;
//             })
//         );

//        dispatch(onPostOneIngredientSuccess({ detailRecipe:response?.data }))

//     } catch (error) {
//       return dispatch(
//         onPostOneIngredientError({
//           error: {
//             code: error.code,
//             message: error.reason
//           }
//         })
//       )
//     }
//   }

//   export const DELETE_INGREDIENT = 'DELETE_INGREDIENT '
//   export const DELETE_INGREDIENT_ERROR = 'DELETE_INGREDIENT_ERROR'
//   export const DELETE_INGREDIENT_SUCCESS = 'DELETE_INGREDIENT_SUCCESS'
//   export const onDeleteIngredient = makeActionCreator(DELETE_INGREDIENT)
//   export const onDeleteIngredientError = makeActionCreator(DELETE_INGREDIENT_ERROR, 'payload')
//   export const onDeleteIngredientSuccess = makeActionCreator(DELETE_INGREDIENT_SUCCESS, 'payload')
//   export const onDeleteIngredientThunk =
//     ({idRecipe,steps,access_token}) =>
//     async dispatch => {

//       dispatch(onDeleteIngredient())

//       try {
//         const response = await addStepInRecipe({ actionType: DELETE_INGREDIENT, idRecipe,steps,access_token })

//          dispatch(onDeleteIngredientSuccess({ detailRecipe:response?.data }))

//       } catch (error) {
//         return dispatch(
//           onDeleteIngredientError({
//             error: {
//               code: error.code,
//               message: error.reason
//             }
//           })
//         )
//       }
//     }

export const POST_ONE_INGREDIENT = "POST_ONE_INGREDIENT ";
export const POST_ONE_INGREDIENT_ERROR = "POST_ONE_INGREDIENT_ERROR";
export const POST_ONE_INGREDIENT_SUCCESS = "POST_ONE_INGREDIENT_SUCCESS";
export const onPostOneIngredient = makeActionCreator(POST_ONE_INGREDIENT);
export const onPostOneIngredientError = makeActionCreator(
  POST_ONE_INGREDIENT_ERROR,
  "payload"
);
export const onPostOneIngredientSuccess = makeActionCreator(
  POST_ONE_INGREDIENT_SUCCESS,
  "payload"
);
export const onPostOneIngredientThunk =
  ({ idRecipe, idIngredient, cantidad, unidad, access_token,onSuccessCallback = ()=> undefined }) =>
  async (dispatch) => {
   
    dispatch(onPostOneIngredient());

    try {
      const ingredient = {
        idIngredient,
        cantidad,
        unidad,
      };

      const response = await createIngredientRecipe({
        actionType: POST_ONE_INGREDIENT,
        idRecipe,
        ingredient,
        access_token,
      });

      dispatch(onPostOneIngredientSuccess());
      onSuccessCallback()
    } catch (error) {
      return dispatch(
        onPostOneIngredientError({
          error: {
            code: error.code,
            message: error.reason,
          },
        })
      );
    }
  };

  export const DELETE_INGREDIENT = 'DELETE_INGREDIENT '
  export const DELETE_INGREDIENT_ERROR = 'DELETE_INGREDIENT_ERROR'
  export const DELETE_INGREDIENT_SUCCESS = 'DELETE_INGREDIENT_SUCCESS'
  export const onDeleteIngredient = makeActionCreator(DELETE_INGREDIENT)
  export const onDeleteIngredientError = makeActionCreator(DELETE_INGREDIENT_ERROR, 'payload')
  export const onDeleteIngredientSuccess = makeActionCreator(DELETE_INGREDIENT_SUCCESS, 'payload')
  export const onDeleteIngredientThunk =
    ({idRecipe, idIngredient, access_token}) =>
    async dispatch => {
  
      dispatch(onDeleteIngredient())
  
      try {
        const response = await deleteIngredient({ actionType: DELETE_INGREDIENT, idRecipe,idIngredient,access_token })   
        console.log(response)
         dispatch(onDeleteIngredientSuccess())       
       
      } catch (error) {
        return dispatch(
          onDeleteIngredientError({
            error: {
              code: error.code,
              message: error.reason
            }
          })
        )
      }
    }
