import { useDispatch } from "react-redux";
import { onGetLoginUserThunk } from "./Login.action";
import { useState } from "react";
import { useNavigate } from "react-router";
import routes from "../../config/settings/routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInformationInputs = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleLoginUser = (e) => {
    e.preventDefault();
    dispatch(
      onGetLoginUserThunk({
        formData,
        onSuccessCallback: () => navigate(routes.home),
      })
    );
  };

  return (
    <form className="max-w-sm mx-auto">
      <div className="mt-20 mb-5">
        <h1 className="text-center mb-8">Iniciar sesión</h1>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tu correo
        </label>
        <input
          type="username"
          id="username"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleInformationInputs}
          placeholder="Ingresa tu username"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tu contraseña
        </label>
        <input
          type="password"
          id="password"
          onChange={handleInformationInputs}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleLoginUser}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default Login;