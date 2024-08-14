import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/settings/routes";
import HomePage from "./pages/Home";
import HeaderSection from "./containers/Header/Header.container";
import DetailRecipePage from "./pages/detailRecipe";
import CategorysPage from "./pages/categorys";
import CreatePage from "./pages/create";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <HeaderSection />
      <Routes>
        <Route element={<CategorysPage />} path={routes.categorys} />
        <Route element={<CreatePage />} path={routes.create} />
        <Route element={<DetailRecipePage />} path={routes.detailRecipe} />
        <Route element={<LoginPage />} path={routes.login} />
        <Route element={<HomePage />} path={routes.home} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
