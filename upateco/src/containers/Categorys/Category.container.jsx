import { useEffect } from "react";
import { useLocation } from "react-router";
import { onGetOneCategoryThunk } from "./Category.action";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "./Category.list";

const CategoryContainer = () => {
  const location = useLocation();
  const { idCategory } = location.state;
  const { recipes } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetOneCategoryThunk(idCategory));
  }, [dispatch, idCategory]);

  return (
    <>
      <CategoryList data={recipes} />
    </>
  );
};

export default CategoryContainer;