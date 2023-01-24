import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// pages
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Auth/Login";
import NewUser from "./components/pages/Auth/NewUser";

// context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router forceRefresh={true}>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new_user" element={<NewUser />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
