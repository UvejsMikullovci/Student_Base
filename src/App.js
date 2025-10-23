import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css"
import Favorited from "./components/pages/group4/favorited";
import Settings from "./components/pages/group4/settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Import HomePage</h1>} />
          <Route path="/panel-favorited" element={<Favorited/>} />
          <Route path="/panel-settings" element={<Settings/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
