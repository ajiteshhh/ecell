import './App.css';
import NavBar from "./components/NavBar.jsx";
import { Routes, Route } from "react-router-dom";
import GridPage from "./pages/GridPage.jsx";

const App = () => {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
      </>
  );
};

export default App;
