import { Link } from "react-router-dom";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";

/* Contenxt */
import {Context} from '../../context/UserContext'

function Navbar() {
  const {authenticated, logout} = useContext(Context)

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
            <Link to="/new_user">Register new user</Link>
          </li>
          <li>
            <Link to="/all_users">Users</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={logout}>Log out</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
