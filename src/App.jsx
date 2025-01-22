import './App.css';
import NavBar from "./components/NavBar.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import GridPage from "./pages/GridPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const App = () => {
  return (
      <>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/grid" element={<NavBar><GridPage/></NavBar>} />
            <Route path="/" element={<Navigate to="/grid" replace/>} />
        </Routes>
      </>
  );
};

export default App;
