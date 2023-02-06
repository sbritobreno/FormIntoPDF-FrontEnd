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
import Login from "./components/pages/Auth/Login";
import NewUser from "./components/pages/Auth/NewUser";
import Users from "./components/pages/User/Users";
import Profile from "./components/pages/User/Profile";
import NewForm from "./components/pages/Form/NewForm";
import Map from "./components/pages/Map/Map";
import LoadSingleHoles from "./components/pages/PDF/LoadSingleHoles";
import CompletePefForm from "./components/pages/PDF/CompletePdfForm";

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
              <Route path="/FormIntoPDF-FrontEnd" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new_user" element={<NewUser />} />
              <Route path="/all_users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new_form" element={<NewForm />} />
              <Route path="/new_pdf" element={<LoadSingleHoles />} />
              <Route
                path="/new_pdf_completeform"
                element={<CompletePefForm />}
              />
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
