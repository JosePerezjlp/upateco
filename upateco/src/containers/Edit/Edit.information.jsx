import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const EditInformation = (props) => {
  const {
    data,
    dataIngredients,
    ingredients,
    measure,
    step,
    onHandleEditInformation,
    onHandleAddNewIngredient,
    onHandleDeleteIngredient,
  } = props;

  const [formData, setFormData] = useState({
    title: data?.title || "",
    description: data?.description || "",
    preparationTime: data?.preparation_time || "",
    cookingTime: data?.cooking_time || "",
    servings: data?.servings || "",
  });
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const initialText = typeof step === "string" ? step : "";

  const [text, setText] = useState(initialText);

  const handleSelectChange = (e) => setSelectedIngredient(e.target.value);
  const handleCantidadChange = (e) => setCantidad(e.target.value);
  const handleUnidadChange = (e) => setUnidad(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    if (selectedIngredient && cantidad && unidad) {
      onHandleAddNewIngredient(selectedIngredient, cantidad, unidad);
      setSelectedIngredient("");
      setCantidad("");
      setUnidad("");
    }
  };

  const handleDeleteIngredient = (idIngredient) => (e) => {
    e.preventDefault();
    const updatedIngredientsList = ingredientsList.filter(
      (item) => item.id !== idIngredient
    );

    setIngredientsList(updatedIngredientsList);

    const updatedFilteredData = filteredData.filter(
      (item) => item.idIngredient !== idIngredient
    );

    setFilteredData(updatedFilteredData);
    onHandleDeleteIngredient(idIngredient);
  };
  const handleChangeStep = (event) => {
    setText(event.target.value);
  };

  const sendInformation = () => {
    onHandleEditInformation(
      formData.title,
      formData.description,
      formData.preparationTime,
      formData.cookingTime,
      formData.servings
    );
  };
  useEffect(() => {
    if (ingredientsList.length > 0 && ingredients.length > 0) {
      const filtered = ingredientsList.map((item) => {
        const matchedIngredient = ingredients.find(
          (ingredient) => Number(item.idIngredient) === ingredient.idIngredient
        );

        if (matchedIngredient) {
          return {
            ...item,
            nameIngredient: matchedIngredient.nameIngredient,
          };
        }

        return item;
      });

      setFilteredData(filtered);
    }
  }, [ingredients, ingredientsList]);
  useEffect(() => {
    if (data) {
      setFormData({
        title: data?.title || "",
        description: data?.description || "",
        preparationTime: data?.preparation_time || "",
        cookingTime: data?.cooking_time || "",
        servings: data?.servings || "",
      });
    }

    if (ingredients) {
      setIngredientsList(
        ingredients ? JSON.parse(JSON.stringify(ingredients)) : []
      );
    }
  }, [data, ingredients]);

  return (
    <div>
      <h1 className="text-center">Aquí puedes crear una receta</h1>
      <h1 className="text-center">Todos los campos son obligatorios</h1>
      <div className="flex">
        <form className="max-w-sm mx-auto w-56">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Titulo receta
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-class"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-class"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tiempo de preparación
            </label>
            <input
              type="text"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="input-class"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tiempo de cocción
            </label>
            <input
              type="text"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="input-class"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cantidad de porciones
            </label>
            <input
              type="text"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className="input-class"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pasos de preparación
            </label>
            <textarea
              value={text}
              onChange={handleChangeStep}
              rows={5}
              cols={50}
              type="text"
              className="pasos"
              required
            />
          </div>
        </form>
        <form className="max-w-sm mx-auto w-56">
          <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            INGREDIENTES
          </h1>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ingredientes disponibles
            </label>
            <select
              className="input-class"
              value={selectedIngredient}
              onChange={handleSelectChange}
              required
            >
              <option value="">Selecciona un ingrediente</option>
              {dataIngredients?.map((ingredient) => (
                <option
                  key={ingredient.idIngredient}
                  value={ingredient.idIngredient}
                >
                  {ingredient.nameIngredient}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cantidad
            </label>
            <input
              type="text"
              value={cantidad}
              onChange={handleCantidadChange}
              className="cantidad"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Unidad de medida
            </label>
            <select
              value={unidad}
              onChange={handleUnidadChange}
              className="input-class"
              required
            >
              <option value="">Selecciona una unidad</option>
              {measure.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleAddIngredient}>
            Agregar ingrediente
          </button>
          <button>Crear nuevo ingrediente</button>
        </form>

        <form className="max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {filteredData.length === 0
              ? ""
              : filteredData.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Ingrediente: {ingredient?.name}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Cantidad: {ingredient?.quantity} {ingredient?.measure}
                      </p>
                      <button
                        onClick={() => handleDeleteIngredient(ingredient?.id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Editar
                      </button>
                      <button
                        onClick={handleDeleteIngredient(ingredient?.id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <button
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
          onClick={sendInformation}
        >
          Editar receta
        </button>
      </div>
    </div>
  );
};

EditInformation.defaultProps = {
  data: {},
  onHandleEditInformation: () => undefined,
  onHandleAddNewIngredient: () => undefined,
  onHandleDeleteIngredient: () => undefined,
};

EditInformation.propTypes = {
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
  dataIngredients: PropTypes.array,
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
  measure: PropTypes.array,
  step: PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number,
    instruction: PropTypes.string,
    order: PropTypes.number,
    owner: PropTypes.number,
    recipe: PropTypes.number,
    updated_at: PropTypes.string,
  }),
  onHandleEditInformation: PropTypes.func,
  onHandleAddNewIngredient: PropTypes.func,
  onHandleDeleteIngredient: PropTypes.func,
};
export default EditInformation;
