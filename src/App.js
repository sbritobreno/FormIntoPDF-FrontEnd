import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// components
import Navbar from "./components/layout/Navbar";
import MobileNavbar from "./components/layout/MobileNavbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";
import ScrollToTop from "../src/components/layout/ScrollToTop";

// pages
import Home from "./components/pages/Home/Home";
import HomeSelector from "./components/pages/HomeSelector/HomeSelector";
import Login from "./components/pages/Auth/Login";
import Profile from "./components/pages/User/Profile";
import NewUser from "./components/pages/Auth/NewUser";
import Users from "./components/pages/User/Users";
import NewDocument from "./components/pages/NewDocument/NewDocument";
import SiteSetup from "./components/pages/DocumentSection/SiteSetup";
import Forms from "./components/pages/DocumentSection/Forms";
import MethodStatements from "./components/pages/DocumentSection/MethodStatements";
import ReinstatementSheet from "./components/pages/DocumentSection/ReinstatementSheet";
import Map from "./components/pages/Map/Map";

// context
import { UserProvider } from "./context/UserContext";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Router forceRefresh={true}>
      <ScrollToTop>
        <UserProvider>
          {isMobile ? <MobileNavbar /> : <Navbar />}
          <Message />
          <Container>
            <Routes>
              <Route path="/FormIntoPDF-FrontEnd/home" element={<Home />} />
              <Route path="/FormIntoPDF-FrontEnd" element={<HomeSelector />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/new" element={<NewUser />} />
              <Route path="/user/all_users" element={<Users />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/document/new" element={<NewDocument />} />
              <Route path="/document/new/sitesetup" element={<SiteSetup />} />
              <Route path="/document/new/forms" element={<Forms />} />
              <Route path="/document/new/methodstatements" element={<MethodStatements />} />
              <Route path="/document/new/reinstatementsheet" element={<ReinstatementSheet />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
