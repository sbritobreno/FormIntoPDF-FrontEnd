import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../../context/UserContext";
import { DocumentContext } from "../../context/DocumentContext";
import ConfirmWindow from "../pages/Extras/ConfirmWindow";
import img from "../../assets/profile_img_default.png";

function Navbar() {
  const { isAdmin, logout, currentUser } = useContext(UserContext);
  const { newDocument } = useContext(DocumentContext);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Create New";
  const message = "Are you sure you want to create a new document ?";

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);
    if (confirmed) {
      await newDocument();
    }
  }

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
        <div className={styles.navbar_logo}>
          <h2>Form Into PDF</h2>
        </div>
        <ul>
          <li className={styles.new_link}>
            <Link to="#" onClick={() => setConfirmWindowOpen(true)}>
              New document +
            </Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {isAdmin ? (
            <li className={styles.dropdown}>
              <Link>Users</Link>
              <div className={styles.dropdown_content}>
                <Link to="/user/new">Create new user</Link>
                <Link to="/user/all_users">See all users</Link>
              </div>
            </li>
          ) : (
            ""
          )}
          <li className={styles.dropdown}>
            <div className={styles.user_img}>
              <img
                src={
                  currentUser.image
                    ? `${process.env.REACT_APP_API}/images/users/${currentUser.image}`
                    : img
                }
                alt="user_image"
              />
            </div>
            <div className={styles.dropdown_content_last}>
              <Link to="/user/profile">{currentUser.name}</Link>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
