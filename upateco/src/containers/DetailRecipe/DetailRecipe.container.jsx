import { useNavigate, useParams } from "react-router";
import InformationRecipe from "./DetailRecipe.information";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetDetailRecipeThunk } from "../Home/Home.action";
import { onDeleteOneRecipeThunk } from "./DetailRecipe.action";

const DetailRecipeContainer = () => {
  const { detailRecipe } = useSelector((state) => state.home);
  const { ingredients, step, message } = useSelector(
    (state) => state.detailRecipe
  );
  const [errorAlert, setErrorAlert] = useState(false);
  const access_token = sessionStorage.getItem("token");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteRecipe = (idRecipe) => {
    dispatch(
      onDeleteOneRecipeThunk({
        idRecipe,
        access_token,
        onSuccessCallback: () => navigate(routes.home),
      })
    );
  };

  useEffect(() => {
    dispatch(onGetDetailRecipeThunk(params?.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (message) {
      setErrorAlert(true);

      const timer = setTimeout(() => {
        setErrorAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <>
      {errorAlert && (
        <div
          id="toast-danger"
          className="ml-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span class="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            No sos propietario de esta receta
          </div>
        </div>
      )}
      <InformationRecipe
        access_token={access_token}
        data={detailRecipe}
        ingredients={ingredients}
        onHandleDeleteRecipe={handleDeleteRecipe}
        step={step}
      />
    </>
  );
};
export default DetailRecipeContainer;
