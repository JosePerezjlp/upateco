import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../config/settings/routes";
import { onGetAllCategoryThunk } from "../Categorys/Category.action";

const HeaderSection = () => {
  const { data } = useSelector((state) => state.category);
  const { login, profileUser } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenLogin, setDropdownOpenLogin] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [profile, setProfile] = useState(null);
  const dropdownRef = useRef(null);
  const dropdownRefLogin = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownLogin = () => {
    setDropdownOpenLogin(!isDropdownOpenLogin);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (
      dropdownRefLogin.current &&
      !dropdownRefLogin.current.contains(event.target)
    ) {
      setDropdownOpenLogin(false);
    }
  };

  const navigate = useNavigate();
  const handleNextView = (idCategory, nameCategory) => () => {
    navigate(routes.categorys.replace(/:name/, nameCategory), {
      state: { idCategory },
    });
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    setLoginUser(false);
    navigate(routes.login);
  };

  useEffect(() => {
    dispatch(onGetAllCategoryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const storedProfile = sessionStorage?.getItem("profile");

    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      setProfile(profileData);
    }
  }, []);

  useEffect(() => {
    if (login || username) {
      setLoginUser(true);
    }
  }, [login, username]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Recetario
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!loginUser ? (
            <Link
              to={routes.login}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpenLogin}
              onClick={toggleDropdownLogin}
              ref={dropdownRefLogin}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
                ref={dropdownRefLogin}
              />
            </button>
          )}
          {isDropdownOpenLogin && (
            <div
              className="absolute z-50 mt-72 right-14 text-base list-none bg-white divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
              ref={dropdownRefLogin}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {profile?.first_name} {profile?.last_name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {profile?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href={routes.create}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Crear receta
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href={routes.home}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li ref={dropdownRef}>
              <a
                onClick={toggleDropdown}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Categorias
              </a>
            </li>
            {isDropdownOpen && (
              <div
                id="dropdownNavbar"
                className="absolute z-10 m-8 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                ref={dropdownRef}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  {data?.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={handleNextView(
                          item.idCategory,
                          item.nameCategory
                        )}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {item.nameCategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;
