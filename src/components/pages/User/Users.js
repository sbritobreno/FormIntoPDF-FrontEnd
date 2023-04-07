import styles from "./Users.module.css";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Pagination from "../../layout/Pagination";

function Users() {
  const [updateList, setUpdateList] = useState(false);
  const { userList, toggleUserAdmin, currentUser, deleteUserAccountByAdmin } =
    useContext(UserContext);
  const [page, setPage] = useState(1);
  const resultsPerPage = 2;
  let numberOfPages = 1;
  const [searchfieldName, setSearchfieldName] = useState("");
  const filteredUser = searchFilter();

  function searchFilter() {
    // filter by Name
    let result = userList.filter((user) => {
      return (
        // Remove currentUser from the list
        user.id !== currentUser.id &&
        user.name.toLowerCase().startsWith(searchfieldName.toLowerCase())
      );
    });

    numberOfPages = Math.ceil(result.length / resultsPerPage);

    result = getPageResults(page, result);

    return result;
  }

  function getPageResults(pageNumber = 1, list) {
    const start = (pageNumber - 1) * resultsPerPage;
    const end = pageNumber * resultsPerPage;

    return list.slice(start, end);
  }

  function onSearchChangeName(event) {
    setSearchfieldName(event.target.value);
  }

  function handleToggle(id) {
    toggleUserAdmin(id);
    setUpdateList(!updateList);
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
        {filteredUser.length > 0 &&
          filteredUser.map((user) => (
            <div className={styles.users_card} key={user.id}>
              <img
                src={`${process.env.REACT_APP_API}/images/users/${user.image}`}
                alt="user_image"
              />
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
                        name="admin"
                        checked={user.admin}
                        onChange={() => handleToggle(user.id)}
                      />
                      <span
                        className={styles.slider}
                        onClick={() => handleToggle(user.id)}
                      ></span>
                    </div>
                  </div>
                  <button
                    className={styles.users_btn_remove}
                    onClick={() => deleteUserAccountByAdmin(user.name, user.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        {userList.length === 0 && <p>Oops, it seems you are the only user!</p>}
      </div>
      <Pagination setPage={setPage} page={page} numberOfPages={numberOfPages} />
    </section>
  );
}

export default Users;
