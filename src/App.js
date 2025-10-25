// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css"
import Favorited from "./components/pages/group4/panelFavortied/favorited";
import Settings from "./components/pages/group4/panelSettings/settings";
import PanelAplications from './components/pages/group4/panelAplications/panelAplications'
<<<<<<< HEAD
import PanelProfile from './components/pages/group4/panelProfile/Profile'
import Footer from "./components/organisms/group5/Footer"; // ✅ Import Footer
=======
import Footer from "./components/organisms/group5/Footer";
>>>>>>> f333c240294aa07cb6c6676b34e8f8cdfdff3c7e
import "./components/styles/variables.css";
import Programet from "./components/pages/group2/programet";
import RrethNeshPage from "./components/pages/group3/RethNeshPage";
import CmimetPage from "./components/pages/group2/CmimetPage";
import HomePage from './components/pages/group1/HomePage'
import ContactPage from "./components/pages/group3/ContactPage";
import PanelPayment from "./components/pages/group4/panelPayment/Payments";
import PanelNotifications from "./components/pages/group4/panelNotifications/PanelNotifications";


function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path="/panel-favorited" element={<Favorited />} />
          <Route path="/panel-settings" element={<Settings />} />
          <Route path="/panel-aplications" element={<PanelAplications />} />
<<<<<<< HEAD
          <Route path="/panel-profile" element={<PanelProfile/>} />
=======
          <Route path="/panel-payment" element={<PanelPayment />} />
          <Route path="/panel-notifications" element={<PanelNotifications />} />
>>>>>>> f333c240294aa07cb6c6676b34e8f8cdfdff3c7e
        </Routes>
        <main style={{ minHeight: "10vh" }}>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/kolegjte" element={<h1>Kolegjët Page</h1>} />
            <Route path="/programet" element={<Programet />} />
            <Route path="/cmimet" element={<CmimetPage />} />
            <Route path="/rreth-nesh" element={<RrethNeshPage />} />
            <Route path="/kontakti" element={<ContactPage />} />
            // TODO: include payment integration page here.
          </Routes >
        </main >
    <Footer />
      </Router >
    </div >
  );
}

export default App;
