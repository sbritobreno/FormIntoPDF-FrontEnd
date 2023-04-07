import { Link } from "react-router-dom";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { isAdmin, logout, currentUser } = useContext(UserContext);

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
                src={`${process.env.REACT_APP_API}/images/users/${currentUser.image}`}
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
