import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import styles from "./MobileNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../../context/UserContext";
import { DocumentContext } from "../../context/DocumentContext";
import ConfirmWindow from "../pages/Extras/ConfirmWindow";
import logo from "../../assets/full_logo.png";

function MobileNavbar() {
  const { isAdmin, logout, currentUser } = useContext(UserContext);
  const { newDocument } = useContext(DocumentContext);
  const [dropdownOpen, setMobileDropdownOpen] = useState(false);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Create New";
  const message = "Are you sure you want to create a new document ?";
  const navigate = useNavigate();

  function openWindow() {
    setConfirmWindowOpen(true);
    setMobileDropdownOpen(false);
  }

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);
    if (confirmed) {
      await newDocument();
    }
  }

  const style = { color: "#fff", fontSize: "2em" };

  return (
    <nav className={styles.navbar_container}>
      {confirmWindowOpen && (
        <ConfirmWindow
          message={message}
          btnText={btnText}
          actionResponse={confirmAction}
        />
      )}
      <div className={styles.navbar}>
        <div className={styles.navbar_logo} onClick={() => navigate("/")}>
          <img src={logo} alt="KendraForm2PDF" />
        </div>
        <div>
          <div className={styles.dropdown}>
            <Link onClick={() => setMobileDropdownOpen(!dropdownOpen)}>
              <GiHamburgerMenu style={style} />
            </Link>
            {dropdownOpen && (
              <div className={styles.dropdown_content}>
                <Link to="/">Home</Link>
                <Link to="#" onClick={openWindow}>
                  New document +
                </Link>
                <Link to="/user/new">Create new user</Link>
                {isAdmin && <Link to="/user/all_users">See all users</Link>}
                {isAdmin && <Link to="/user/profile">{currentUser.name}</Link>}
                <Link to="/login" onClick={logout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MobileNavbar;
