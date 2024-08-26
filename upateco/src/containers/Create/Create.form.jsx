import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CreateForm = (props) => {
  const { dataIngredients, onHandleCreateRecipe, measure } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [steps, setSteps] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectChange = (e) => setSelectedIngredient(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleUnitChange = (e) => setUnit(e.target.value);
  const handleStepRecipe = (e) => {
    setSteps(e.target.value);
  };
  const handleRecipe = (e) => {
    if (e.target.className === "preparacion") {
      setPrepTime(e.target.value);
    } else if (e.target.className === "coccion") {
      setCookTime(e.target.value);
    } else {
      setServings(e.target.value);
    }
  };
  const handleAddIngredient = () => {
    if (selectedIngredient && quantity && unit) {
      setIngredientsList([
        ...ingredientsList,
        { idIngredient: selectedIngredient, cantidad: quantity, unidad: unit },
      ]);

      setSelectedIngredient("");
      setQuantity("");
      setUnit("");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClosedModal = () => {
    setOpenModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onHandleCreateRecipe(
      title,
      description,
      prepTime,
      cookTime,
      servings,
      ingredientsList,
      steps
    );
  };
  const handleDeleteIngredient = (idIngredient) => () => {
    const updatedIngredientsList = ingredientsList.filter(
      (item) => item.idIngredient !== idIngredient
    );

    setIngredientsList(updatedIngredientsList);

    const updatedFilteredData = filteredData.filter(
      (item) => item.idIngredient !== idIngredient
    );

    setFilteredData(updatedFilteredData);
  };

  useEffect(() => {
    if (ingredientsList.length > 0 && dataIngredients.length > 0) {
      const filtered = ingredientsList.map((item) => {
        const matchedIngredient = dataIngredients.find(
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
  }, [dataIngredients, ingredientsList]);

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={handleRecipe}
              className="preparacion"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tiempo de cocción
            </label>
            <input
              type="text"
              onChange={handleRecipe}
              className="coccion"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cantidad de porciones
            </label>
            <input
              type="text"
              onChange={handleRecipe}
              className="porciones"
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
              value={selectedIngredient}
              onChange={handleSelectChange}
              className="input-class"
              required
            >
              <option value="">Selecciona un ingrediente</option>
              {dataIngredients.map((ingredient) => (
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
              value={quantity}
              onChange={handleQuantityChange}
              className="input-class"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Unidad de medida
            </label>
            <select
              value={unit}
              onChange={handleUnitChange}
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
          <button onClick={handleOpenModal}>Crear nuevo ingrediente</button>

          {openModal && (
            <div
              id="authentication-modal"
              className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-md max-h-full p-4">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Agregar nuevo ingrediente
                    </h3>
                    <button
                      type="button"
                      onClick={handleClosedModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
        <form className="max-w-sm mx-auto w-56">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pasos de preparación
            </label>
            <textarea
              type="text"
              onChange={handleStepRecipe}
              className="pasos"
              required
            />
          </div>
        </form>

        <button onClick={handleSubmit}>Crear nueva receta</button>
      </div>
      {filteredData.length === 0
        ? ""
        : filteredData.map((ingredient, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
            >
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Ingrediente: {ingredient.nameIngredient}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Cantidad: {ingredient.cantidad} {ingredient.unidad}
                </p>
                <button
                  onClick={handleDeleteIngredient(ingredient.idIngredient)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Eliminar ingrediente de la receta
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

CreateForm.defaultProps = {
  dataIngredients: [],
  onHandleCreateRecipe: () => undefined,
  measure: [],
};

CreateForm.propTypes = {
  dataIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      idIngredient: PropTypes.number,
      nameIngredient: PropTypes.string,
    })
  ),
  onHandleCreateRecipe: PropTypes.func,
  measure: PropTypes.array,
};
export default CreateForm;
