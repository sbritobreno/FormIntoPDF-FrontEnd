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
import Profile from "./components/pages/User/Profile";
import NewUser from "./components/pages/Auth/NewUser";
import Users from "./components/pages/User/Users";
import AllDocumentSections from "./components/pages/AllDocumentSections/AllDocumentSections";
import SiteAttendance from "./components/pages/DocumentSection/SiteAttendance";
import SiteSetup from "./components/pages/DocumentSection/SiteSetup";
import ApprovedForm from "./components/pages/DocumentSection/ApprovedForm";
import Forms from "./components/pages/DocumentSection/Forms";
import MethodStatements from "./components/pages/DocumentSection/MethodStatements";
import ReinstatementSheetTable from "./components/pages/DocumentSection/ReinstatementSheetTable";
import ReinstatementSheetInfo from "./components/pages/DocumentSection/ReinstatementSheetInfo";
import ReinstatementSheetHoleSequenceNew from "./components/pages/DocumentSection/ReinstatementSheetHoleSequenceNew";
import ReinstatementSheetHoleSequenceEdit from "./components/pages/DocumentSection/ReinstatementSheetHoleSequenceEdit";
import Map from "./components/pages/Map/Map";

// context
import { UserProvider } from "./context/UserContext";
import { DocumentProvider } from "./context/DocumentContext";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Router forceRefresh={true}>
      <ScrollToTop>
        <UserProvider>
          <DocumentProvider>
            {isMobile ? <MobileNavbar /> : <Navbar />}
            <Message />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/new" element={<NewUser />} />
                <Route path="/user/all_users" element={<Users />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route
                  path="/document/:id/update"
                  element={<AllDocumentSections />}
                />
                <Route
                  path="/document/new/siteattendance"
                  element={<SiteAttendance />}
                />
                <Route
                  path="/document/:id/update/siteattendance"
                  element={<SiteAttendance />}
                />
                <Route
                  path="/document/:id/update/sitesetup"
                  element={<SiteSetup />}
                />
                <Route
                  path="/document/:id/update/approvedform"
                  element={<ApprovedForm />}
                />
                <Route path="/document/:id/update/forms" element={<Forms />} />
                <Route
                  path="/document/:id/update/methodstatements"
                  element={<MethodStatements />}
                />
                <Route
                  path="/document/:id/update/reinstatementsheet_table"
                  element={<ReinstatementSheetTable />}
                />
                <Route
                  path="/document/:id/update/reinstatementsheet_info"
                  element={<ReinstatementSheetInfo />}
                />
                <Route
                  path="/document/:id/update/hole_sequence/new"
                  element={<ReinstatementSheetHoleSequenceNew />}
                />
                <Route
                  path="/document/:documentId/update/hole_sequence/:id"
                  element={<ReinstatementSheetHoleSequenceEdit />}
                />
                <Route path="/map" element={<Map />} />
              </Routes>
            </Container>
            <Footer />
          </DocumentProvider>
        </UserProvider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
