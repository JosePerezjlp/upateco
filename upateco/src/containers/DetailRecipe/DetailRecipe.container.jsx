import { useParams } from "react-router";
import InformationRecipe from "./DetailRecipe.information";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetDetailRecipeThunk } from "../Home/Home.action";

const DetailRecipeContainer = () => {
  const { detailRecipe } = useSelector((state) => state.home);
  const { ingredients, step } = useSelector((state) => state.detailRecipe);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetDetailRecipeThunk(params?.id));
  }, [dispatch, params.id]);

  return (
    <>
      <InformationRecipe
        data={detailRecipe}
        ingredients={ingredients}
        step={step}
      />
    </>
  );
};
export default DetailRecipeContainer;
