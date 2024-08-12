import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/settings/routes";
import HomePage from "./pages/Home";
import HeaderSection from "./containers/Header/Header.container";
import DetailRecipePage from "./pages/detailRecipe";

function App() {
  return (
    <BrowserRouter>
      <HeaderSection />
      <Routes>
        <Route element={<DetailRecipePage />} path={routes.detailRecipe} />
        <Route element={<HomePage />} path={routes.home} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
