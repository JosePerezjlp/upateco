import { useDispatch, useSelector } from "react-redux";
import CreateForm from "./Create.form";
import { useCallback, useEffect, useState } from "react";
import {
  onGetAllIngredientsThunk,
  onGetMeasureThunk,
  onPostRecipeThunk,
} from "./Create.action";
import { useNavigate } from "react-router";

const CreateContainer = () => {
  const { data, measure } = useSelector((state) => state.createRecipe);
  const [successAlert, setSuccessAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("token");
  const handleCreateRecipe = useCallback(
    (
      title,
      description,
      prepTime,
      cookTime,
      servings,
      ingredientsList,
      steps
    ) => {
      dispatch(
        onPostRecipeThunk({
          title,
          description,
          prepTime,
          cookTime,
          servings,
          ingredientsList,
          steps,
          access_token,
          onSuccessCallback: () => setSuccessAlert(true),
        })
      );
    },
    [access_token]
  );

  useEffect(() => {
    if (!access_token) {
      navigate(routes.login);
    }
  }, [access_token, navigate]);

  useEffect(() => {
    dispatch(onGetAllIngredientsThunk());
    dispatch(onGetMeasureThunk());
  }, [dispatch]);

  useEffect(() => {
    if (successAlert) {
      const timeoutId = setTimeout(() => {
        setSuccessAlert(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [successAlert]);
  return (
    <>
      {successAlert && (
        <div
          id="toast-success"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            La receta se creo con exito!
          </div>
        </div>
      )}
      <CreateForm
        dataIngredients={data}
        onHandleCreateRecipe={handleCreateRecipe}
        measure={measure}
      />
    </>
  );
};
export default CreateContainer;
