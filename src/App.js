// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css"
import Favorited from "./components/pages/group4/favorited";
import Settings from "./components/pages/group4/settings";
import Footer from "./components/organisms/group5/Footer"; // ✅ Import Footer
import "./components/styles/variables.css";
import Programet from "./components/pages/group2/programet";
import RrethNeshPage from "./components/pages/group3/RethNeshPage";

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
        <main style={{ minHeight: "80vh" }}> {/* ✅ Ensures content spacing above footer */}
          <Routes>
            <Route path="/" element={<h1>Import HomePage</h1>} />
            <Route path="/kolegjte" element={<h1>Kolegjët Page</h1>} />
            <Route path="/programet" element={<Programet />} />
            <Route path="/cmimet" element={<h1>Çmimet Page</h1>} />
            <Route path="/rreth-nesh" element={<RrethNeshPage />} />
            <Route path="/kontakti" element={<h1>Kontakti Page</h1>} />
          </Routes>
        </main>
        <Footer /> {/* ✅ Footer shown on all routes */}
      </Router>
    </div>
  );
}

export default App;
