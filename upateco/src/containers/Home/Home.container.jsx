import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetAllRecipesThunk } from "./Home.action";
import ListProducts from "./Home.listProducts";

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
