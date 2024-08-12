import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/settings/routes";
import HomePage from "./pages/Home";
import HeaderSection from "./containers/Header/Header.container";

function App() {
  return (
    <BrowserRouter>
      <HeaderSection />
      <Routes>
        {" "}
        <Route element={<HomePage />} path={routes.home} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
