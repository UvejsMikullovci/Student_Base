// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css";
import Favorited from "./components/pages/group4/panelFavortied/favorited";
import Settings from "./components/pages/group4/panelSettings/settings";
import PanelAplications from "./components/pages/group4/panelAplications/panelAplications";
import Footer from "./components/organisms/group5/Footer";
import Programet from "./components/pages/group2/programet";
import RrethNeshPage from "./components/pages/group3/RethNeshPage";
import CollegeDetailsPage from "./components/pages/group1/CollegeDetailsPage";
import CmimetPage from "./components/pages/group2/CmimetPage"; 
import KontaktiPage from "./components/pages/group3/KontaktiPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/panel-favorited" element={<Favorited />} />
          <Route path="/panel-settings" element={<Settings />} />
          <Route path="/panel-aplications" element={<PanelAplications />} />
        </Routes>

        <main style={{ minHeight: "10vh" }}>
          {/* ✅ Routes kryesore të faqes */}
          <Routes>
            <Route path="/" element={<h1>Import HomePage</h1>} />
            <Route path="/kolegjet/:collegeId" element={<CollegeDetailsPage />} />
            <Route path="/programet" element={<Programet />} />
            <Route path="/cmimet" element={<CmimetPage />} /> 
            <Route path="/rreth-nesh" element={<RrethNeshPage />} />

          </Routes>
        </main>

        <Footer /> {/* ✅ Footer në çdo faqe */}
      </Router>
    </div>
  );
}

export default App;
