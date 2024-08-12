import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "./Home.listProducts";
import { onGetAllRecipesThunk } from "./Home.action";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(onGetAllRecipesThunk());
  }, [dispatch]);

  return (
    <>
      <ListProducts data={data} />
    </>
  );
};

export default HomeContainer;
