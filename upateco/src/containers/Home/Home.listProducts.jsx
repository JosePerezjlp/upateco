import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import routes from "../../config/settings/routes";

const ListProducts = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const handleChangeView = (idRecipe) => () => {
    navigate(routes.detailRecipe.replace(/:id/, idRecipe));
  };

  return (
    <div className="flex flex-wrap justify-evenly gap-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://i.postimg.cc/R0Vz5Ktg/Humitas.webp"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.description}
            </p>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleChangeView(item.id)}
            >
              Ver receta
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ListProducts.defaultProps = {
  data: [],
};

ListProducts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      categories: PropTypes.array,
      cooking_time: PropTypes.number,
      created_at: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      image: PropTypes.string,
      ingredients: PropTypes.array,
      locations: PropTypes.array,
      owner: PropTypes.number,
      preparation_time: PropTypes.number,
      servings: PropTypes.number,
      title: PropTypes.string,
      updated_at: PropTypes.string,
      view_count: PropTypes.number,
    })
  ),
};

export default ListProducts;
