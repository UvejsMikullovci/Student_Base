import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/organisms/group5/Header";
import "./components/styles/variables.css";
import PanelProfile from "./components/pages/panelMain/PanelMainContainer";
import Footer from "./components/organisms/group5/Footer";
import Programet from "./components/pages/group2/programet";
import CmimetPage from "./components/pages/group2/CmimetPage";
import HomePage from "./components/pages/group1/HomePage";
import ContactPage from "./components/pages/group3/ContactPage";
import Collages from "./components/pages/group1/Collages/Collages";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import CollegeDetailsPage from "./components/pages/group1/IndividualColleges/CollegeDetailsPage";
import Dorms from "./components/pages/group1/Dorms.js"
import PanelDormsMain from "./components/pages/panelDorms/PanelDormsMain/PanelDormsMain.js";
import PanelProfMain from "./components/pages/panelProf/panelProfMain/PanelProf.js";
import PanelProfStudents from "./components/pages/panelProf/panelProfStudents/PanelProfStudents.js";
import RoomListingPage from "./components/pages/group1/RoomDetails/RoomListingPage.js";
import AboutUs from './components/pages/group3/RethNeshPage.js';
import PanelCollageMain from './components/pages/panelColleges/panelCollageMain/panelCollageMain.js'
import PanelProfileSettings from "./components/pages/panelProf/panelProfileSettings/PanelProfileSettings.js";


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/PanelKolegj" element={<PanelCollageMain />} />
            <Route path="/panel" element={<PanelProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/konviktet" element={<Dorms />} />
            <Route path="/kolegjte/:collegeId" element={<CollegeDetailsPage />} />
            <Route path="/panelProf/Students" element={<PanelProfStudents />} />
            <Route path="/panelProf/Settings" element={<PanelProfileSettings />} />
             <Route path="/dhoma" element={<RoomListingPage />} />
          </Routes>

          <main style={{ minHeight: "10vh" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kolegjte" element={<Collages />} />
              <Route path="/programet" element={<Programet />} />
              <Route path="/cmimet" element={<CmimetPage />} />
              <Route path="/rreth-nesh" element={<AboutUs />} />
              <Route path="/kontakti" element={<ContactPage />} />
              <Route path="/PanelDorms" element={<PanelDormsMain />} />
              <Route path="/PanelProf" element={<PanelProfMain />} />
            </Routes>
          </main>

          <Footer/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
