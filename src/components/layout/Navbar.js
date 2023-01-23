import { Link } from "react-router-dom";
import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
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
          <li>
            <Link to="/new_form">New form</Link>
          </li>
          <li>
            <Link to="/register">Register new user</Link>
          </li>
          <li>
            <Link to="/all_users">Users</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>Log out</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
