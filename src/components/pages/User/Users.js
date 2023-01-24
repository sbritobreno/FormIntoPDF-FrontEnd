import styles from "./Users.module.css";
import { useState } from "react";
import { users_staff } from "../../../data";

function Users() {
  const [searchfieldName, setSearchfieldName] = useState("");
  const filteredUser = searchFilter();

  function searchFilter() {
    // filter by Name
    return users_staff.filter((user) => {
      return user.name.toLowerCase().startsWith(searchfieldName.toLowerCase());
    });
  }

  function onSearchChangeName(event) {
    setSearchfieldName(event.target.value);
  }

  function toggleAdmin(id) {
    // it is working but it is not refreshing cause there is no state
    const user = users_staff.filter((user) => user.id === id);
    user[0].isadmin = !user[0].isadmin;
  }

  return (
    <section>
      <div className={styles.users_header}>
        <h1>See here all Users!</h1>
        <p>Edit and/or delete any User.</p>
      </div>
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Name"
          onChange={onSearchChangeName}
        />
      </div>
      <div className={styles.users_container}>
        {users_staff.length > 0 &&
          filteredUser.map((user) => (
            <div className={styles.users_card} key={user.id}>
              <img src={user.image} alt="user_image" />
              <div className={styles.users_card_subcontainer}>
                <div className={styles.users_details}>
                  <p>
                    <span className="bold">Name: </span> {user.name}
                  </p>
                  <p>
                    <span className="bold">Role: </span> {user.role}
                  </p>
                  <p>
                    <span className="bold">E-mail: </span> {user.email}
                  </p>
                </div>

                <div className={styles.users_card_buttons}>
                  <div className={styles.toggle_switch}>
                    <label>admin: </label>
                    <div className={styles.switch}>
                      <input
                        type="checkbox"
                        name="isadmin"
                        defaultChecked={user.isadmin}
                      />
                      <span
                        className={styles.slider}
                        onClick={() => toggleAdmin(user.id)}
                      ></span>
                    </div>
                  </div>
                  <button className={styles.users_btn_remove}>
                    Remove user
                  </button>
                </div>
              </div>
            </div>
          ))}
        {users_staff.length === 0 && (
          <p>Oops, it seems you are the only user!</p>
        )}
      </div>
    </section>
  );
}

export default Users;
