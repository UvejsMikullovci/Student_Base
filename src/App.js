import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/organisms/Header/Header.jsx";
import "./components/styles/variables.css";
import StudentPanel from "./components/pages/Panels/StudentPanel/StudentPanelMain/StudentPanelMain.js";
import Footer from "./components/organisms/Footer/Footer.jsx";
import Programs from "./components/pages/Programs/Programs.js";
import Pricing from "./components/pages/Pricing/Pricing.js";
import HomePage from "./components/pages/Homepage/HomePage.jsx";
import Contact from "./components/pages/Contact/Contact.js";
import Collages from "./components/pages/Collages/CollagesMain/Collages.js";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import CollegeDetailsPage from "./components/pages/Collages/IndividualCollagePage/IndividualCollagePage.js";
import Dorms from "./components/pages/Dorms/Dorms.js"
import LandlordPanel from "./components/pages/Panels/LandlordPanel/PanelLandlordMain/PanelLandlordMain.js";
import ProfessorPanel from "./components/pages/Panels/ProfessorPanel/ProfessorPanelMain/ProfessorPanelMain.js";
import AboutUs from './components/pages/AboutUs/AboutUs.js';
import CollagePanel from './components/pages/Panels/CollagePanel/PanelCollageMain/panelCollageMain.js'


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/CollegePanel" element={<CollagePanel />} />
            <Route path="/StudentPanel" element={<StudentPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Dorms" element={<Dorms />} />
            <Route path="/Colleges/:collegeId" element={<CollegeDetailsPage />} />
          </Routes>

          <main style={{ minHeight: "10vh" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Colleges" element={<Collages />} />
              <Route path="/Programs" element={<Programs />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/LandlordPanel" element={<LandlordPanel />} />
              <Route path="/ProfessorPanel" element={<ProfessorPanel />} />
            </Routes>
          </main>

          <Footer/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
