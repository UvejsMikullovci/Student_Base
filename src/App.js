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
import PanelApplicants from "./components/pages/panelColleges/panelApplicants";
import PanelCollege from "./components/pages/panelColleges/panelCollage";
import Dorms from "./components/pages/group1/Dorms.js"
import "./components/styles/panelCollage.css";
import PanelDormsMain from "./components/pages/panelDorms/PanelDormsMain/PanelDormsMain.js";
import PanelProfMain from "./components/pages/panelProf/panelProfMain/PanelProf.js";
import PanelProfStudents from "./components/pages/panelProf/panelProfStudents/PanelProfStudents.js";
import RoomListingPage from "./components/pages/group1/RoomDetails/RoomListingPage.js";


function App() {
  const HeaderWrapper = () => {
    const location = useLocation();
    if (location.pathname === "/panel-college" || location.pathname === "/panel") {
      return null;
    }
    return <Header />;
  };

  const FooterWrapper = () => {
    const location = useLocation();
    if (location.pathname === "/panel-college" || location.pathname === "/panel") {
      return null;
    }
    return <Footer />;
  };

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <HeaderWrapper />
          <Routes>
            <Route path="/panel" element={<PanelProfile />} />
            <Route path="/panel-college" element={<PanelCollege />} />
            <Route path="/panelApplicants" element={<PanelApplicants />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/konviktet" element={<Dorms />} />
            <Route path="/kolegjte/:collegeId" element={<CollegeDetailsPage />} />
            //This is just to test the students page on profesors panel
            <Route path="/panelProf/Students" element={<PanelProfStudents />} />
             <Route path="/dhoma" element={<RoomListingPage />} />
          </Routes>

          <main style={{ minHeight: "10vh" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kolegjte" element={<Collages />} />
              <Route path="/programet" element={<Programet />} />
              <Route path="/cmimet" element={<CmimetPage />} />
              {/* Rreth Nesh page temporarily disabled due to build issues */}
              <Route path="/kontakti" element={<ContactPage />} />
              <Route path="/PanelDorms" element={<PanelDormsMain />} />
              <Route path="/PanelProf" element={<PanelProfMain />} />
            </Routes>
          </main>

          <FooterWrapper />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
