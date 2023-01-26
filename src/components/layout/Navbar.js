import { Link } from "react-router-dom";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";

/* Contenxt */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <h2>Form Into PDF</h2>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.dropdown}>
            <Link>New form</Link>
            <div className={styles.dropdown_content}>
              <Link to="/new_form_1">New form 1</Link>
              <Link to="/new_form_2">New form 2</Link>
              <Link to="/new_form_3">New form 3</Link>
            </div>
          </li>
          <li className={styles.dropdown}>
            <Link>Users</Link>
            <div className={styles.dropdown_content}>
              <Link to="/new_user">Create new user</Link>
              <Link to="/all_users">See all users</Link>
            </div>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
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
