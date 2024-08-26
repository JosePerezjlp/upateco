import { useDispatch, useSelector } from "react-redux";
import EditInformation from "./Edit.information";
import { useParams } from "react-router";
import { onGetDetailRecipeThunk } from "../Home/Home.action";
import { useCallback, useEffect } from "react";
import {
  onGetAllIngredientsThunk,
  onGetMeasureThunk,
  onPostIngredientsRecipeThunk,
} from "../Create/Create.action";
import {
  onDeleteIngredientThunk,
  onPostOneIngredientThunk,
  onUpdateRecipeThunk,
} from "./Edit.action";

const EditContainer = () => {
  const { detailRecipe } = useSelector((state) => state.home);
  const { ingredients, step, message } = useSelector(
    (state) => state.detailRecipe
  );
  const { data, measure } = useSelector((state) => state.createRecipe);

  const access_token = sessionStorage.getItem("token");
  const params = useParams();
  const dispatch = useDispatch();
  const handleEditInformation = useCallback(
    (title, description, preparationTime, cookingTime, servings) => {
      dispatch(
        onUpdateRecipeThunk({
          idRecipe: params?.id,
          title,
          description,
          preparationTime,
          cookingTime,
          servings,
          access_token,
        })
      );
    }
  );

  const handleAddNewIngredient = useCallback(
    (idIngredient, cantidad, unidad) => {
      dispatch(
        onPostOneIngredientThunk({
          idRecipe: params.id,
          idIngredient,
          cantidad,
          unidad,
          access_token,
          onSuccessCallback: () => window.location.reload(),
        })
      );
    }
  );

  const handleDeleteIngredient = useCallback((idIngredient) => {
    dispatch(
      onDeleteIngredientThunk({
        idRecipe: params.id,
        idIngredient,
        access_token,
      })
    );
  });
  useEffect(() => {
    dispatch(onGetDetailRecipeThunk(params?.id));
    dispatch(onGetAllIngredientsThunk());
    dispatch(onGetMeasureThunk());
  }, [dispatch, params.id]);

  return (
    <>
      <EditInformation
        data={detailRecipe}
        dataIngredients={data}
        ingredients={ingredients}
        step={step}
        onHandleEditInformation={handleEditInformation}
        onHandleAddNewIngredient={handleAddNewIngredient}
        onHandleDeleteIngredient={handleDeleteIngredient}
        message={message}
        measure={measure}
      />
    </>
  );
};

export default EditContainer;
