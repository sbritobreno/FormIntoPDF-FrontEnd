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
import Users from "./components/pages/User/Users";
import Profile from "./components/pages/User/Profile";
import Form1 from "./components/pages/Form/Form1";

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
            <Route path="/all_users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new_form_1" element={<Form1/>} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
