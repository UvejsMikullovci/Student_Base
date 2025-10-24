// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css"
import Favorited from "./components/pages/group4/panelFavortied/favorited";
import Settings from "./components/pages/group4/panelSettings/settings";
import PanelAplications from './components/pages/group4/panelAplications/panelAplications'
import Footer from "./components/organisms/group5/Footer"; // ✅ Import Footer
import "./components/styles/variables.css";
import Programet from "./components/pages/group2/programet";
import RrethNeshPage from "./components/pages/group3/RethNeshPage";
import CmimetPage from "./components/pages/group2/CmimetPage";
import HomePage from './components/pages/group1/HomePage'
import ContactPage from "./components/pages/group3/ContactPage";

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
        <main style={{ minHeight: "10vh" }}> {/* ✅ Ensures content spacing above footer */}
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/kolegjte" element={<h1>Kolegjët Page</h1>} />
            <Route path="/programet" element={<Programet />} />
            <Route path="/cmimet" element={<CmimetPage />} />
            <Route path="/rreth-nesh" element={<RrethNeshPage />} />
            <Route path="/kontakti" element={<ContactPage />} />
          </Routes >
        </main >
    <Footer /> {/* ✅ Footer shown on all routes */ }
      </Router >
    </div >
  );
}

export default App;
