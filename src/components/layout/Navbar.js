import { Link } from "react-router-dom";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";

import { users_staff } from "../../data";

/* Contenxt */
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { logout } = useContext(UserContext);

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <h2>Form Into PDF</h2>
        </div>
        <ul>
          <li className={styles.new_link}>
            <Link to="/document/new">New document +</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li className={styles.dropdown}>
            <Link>Users</Link>
            <div className={styles.dropdown_content}>
              <Link to="/user/new">Create new user</Link>
              <Link to="/user/all_users">See all users</Link>
            </div>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.user_img}>
              <img src={users_staff[0].image} alt="user_image" />
            </div>
            <div className={styles.dropdown_content_last}>
              <Link to="/user/profile">{users_staff[0].name}</Link>
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
