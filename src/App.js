
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css";
import PanelProfile from "./components/pages/panelMain/PanelMainContainer";
import Footer from "./components/organisms/group5/Footer";
import "./components/styles/variables.css";
import Programet from "./components/pages/group2/programet";
import RrethNeshPage from "./components/pages/group3/RethNeshPage";
import CmimetPage from "./components/pages/group2/CmimetPage";
import HomePage from "./components/pages/group1/HomePage";
import ContactPage from "./components/pages/group3/ContactPage";
import Collages from './components/pages/group1/Collages/Collages';
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path="/panel" element={<PanelProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <main style={{ minHeight: "10vh" }}>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/kolegjte" element={<Collages />} />
            <Route path="/programet" element={<Programet />} />
            <Route path="/cmimet" element={<CmimetPage />} />
            <Route path="/rreth-nesh" element={<RrethNeshPage />} />
            { <Route path="/kontakti" element={<ContactPage />} /> }
            // TODO: include payment integration page here.
          </Routes>
        </main>
        <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
