import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import styles from "./MobileNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

import { users_staff } from "../../data";

/* Contenxt */
import { Context } from "../../context/UserContext";

function MobileNavbar() {
  const { logout } = useContext(Context);
  const [dropdownOpen, setMobileDropdownOpen] = useState(false);
  const style = { color: "#fff", fontSize: "2em" };

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <h2>Form Into PDF</h2>
        </div>
        <div>
          <div className={styles.dropdown}>
            <Link onClick={() => setMobileDropdownOpen(!dropdownOpen)}>
              <GiHamburgerMenu style={style} />
            </Link>
            {dropdownOpen && (
              <div className={styles.dropdown_content}>
                <Link to="/FormIntoPDF-FrontEnd">Home</Link>
                <Link to="/document/new">New document +</Link>
                <Link to="/user/new">Create new user</Link>
                <Link to="/user/all_users">See all users</Link>
                <Link to="/user/profile">{users_staff[0].name}</Link>
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
