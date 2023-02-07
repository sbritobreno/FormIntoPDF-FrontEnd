import { Link } from "react-router-dom";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";

/* Contenxt */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { logout } = useContext(Context);

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <h2>Form Into PDF</h2>
        </div>
        <ul>
          <li>
            <Link to="/FormIntoPDF-FrontEnd">Home</Link>
          </li>
          <li className={styles.dropdown}>
            <Link>Create</Link>
            <div className={styles.dropdown_content}>
              <Link to="/form/new">New form</Link>
              <Link to="/pdf/new">New pdf</Link>
            </div>
          </li>
          <li className={styles.dropdown}>
            <Link>Users</Link>
            <div className={styles.dropdown_content}>
              <Link to="/user/new">Create new user</Link>
              <Link to="/user/all_users">See all users</Link>
            </div>
          </li>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li onClick={logout}>
            <Link>Log out</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
