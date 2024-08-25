import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import routes from "../../config/settings/routes";
const CategoryList = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const handleChangeView = (idRecipe) => () => {
    navigate(routes.detailRecipe.replace(/:id/, idRecipe));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
          style={{ height: "400px" }}
        >
          <a>
            <img
              className="rounded-t-lg object-cover w-full h-48 transform transition-transform duration-300 hover:scale-105"
              src={item.image}
              alt=""
            />
          </a>
          <div className="p-5 flex flex-col justify-between flex-grow">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </a>
            <p
              className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis"
              style={{
                WebkitLineClamp: 3,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.description}
            </p>
            <button
              onClick={handleChangeView(item.id)}
              className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
            >
              Ver receta
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

CategoryList.defaultProps = {
  data: [],
};

CategoryList.propTypes = {
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

export default CategoryList;
