// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Import HomePage</h1>} />
          <Route path="/kolegjte" element={<h1>Kolegjët Page</h1>} />
          <Route path="/programet" element={<h1>Programet Page</h1>} />
          <Route path="/cmimet" element={<h1>Çmimet Page</h1>} />
          <Route path="/rreth-nesh" element={<h1>Rreth Nesh Page</h1>} />
          <Route path="/kontakti" element={<h1>Kontakti Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
