import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../config/settings/routes";

const InformationRecipe = (props) => {
  const { data, ingredients, onHandleDeleteRecipe, step } = props;

  const handleDeleteRecipe = () => {
    onHandleDeleteRecipe(data.id);
  };

  return (
    <div className="grid place-items-center mt-5">
      <div className="flex flex-col max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row gap-3">
          <div className="w-3/6">
            <img className="rounded-t-lg" src={data.image} alt="" />
          </div>
          <div className="w-3/6">
            <h1 className="font-bold text-3xl mb-5">{data.title}</h1>
            <p className="mb-2">{data.description}</p>
            <p className="font-bold">INGREDIENTES</p>
            {ingredients.map((item, index) => (
              <p key={index}>
                {item.name} {item.quantity} {item.measure}
              </p>
            ))}
          </div>
        </div>
        <div className=" w-full mt-3 p-3">
          <h1 className="font-bold text-center">PREPARACIÓN</h1>
          <p className="text-center">{step.instruction}</p>
        </div>
      </div>
      <button className="" onClick={handleDeleteRecipe}>
        Eliminar Receta
      </button>
      <Link to={routes.edit.replace(/:id/, data.id)}>Editar receta</Link>
    </div>
  );
};

InformationRecipe.defaultProps = {
  data: {},
  onHandleDeleteRecipe: () => undefined,
};

InformationRecipe.propTypes = {
  data: PropTypes.shape({
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
  }),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string,
      id: PropTypes.number,
      ingredient: PropTypes.number,
      measure: PropTypes.string,
      owner: PropTypes.number,
      quantity: PropTypes.number,
      recipe: PropTypes.number,
      updated_at: PropTypes.string,
    })
  ),
  onHandleDeleteRecipe: PropTypes.func,
  step: PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number,
    instruction: PropTypes.string,
    order: PropTypes.number,
    owner: PropTypes.number,
    recipe: PropTypes.number,
    updated_at: PropTypes.string,
  }),
};

export default InformationRecipe;
