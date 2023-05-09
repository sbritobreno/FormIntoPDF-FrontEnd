import styles from "./Users.module.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import Pagination from "../../layout/Pagination";
import ConfirmWindow from "../Extras/ConfirmWindow";
import { RiDeleteBin6Line } from "react-icons/ri";

function Users() {
  const {
    userList,
    getUsersList,
    toggleUserAdmin,
    currentUser,
    deleteUserAccountByAdmin,
  } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const resultsPerPage = 2;
  let numberOfPages = 1;
  const [searchfieldName, setSearchfieldName] = useState("");
  const filteredUser = searchFilter();
  const [rerender, setRerender] = useState(false); // create a state variable

  const [userToBeDeleted, setUserToBeDeleted] = useState({});
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Delete";
  const message = `Are you sure you want to remove ${
    userToBeDeleted?.name?.split(" ")[0]
  }'s account ?`;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getUsersList();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  function searchFilter() {
    // filter by Name
    let result = userList.filter((user) => {
      return (
        // Remove currentUser from the list
        user.id !== currentUser.id &&
        user.id !== 1 && // Remove Admin user from the list Admin === Dev
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

  async function handleToggle(id) {
    await toggleUserAdmin(id);
    setRerender(!rerender);
  }

  function removeUser(username, userId) {
    setUserToBeDeleted({ name: username, id: userId });
    setConfirmWindowOpen(true);
  }

  async function confirmAction(confirm = false) {
    setConfirmWindowOpen(false);
    if (confirm) {
      await deleteUserAccountByAdmin(userToBeDeleted.name, userToBeDeleted.id);
    }
    setUserToBeDeleted({});
    setRerender(!rerender);
  }

  return (
    <section>
      {confirmWindowOpen && (
        <ConfirmWindow
          message={message}
          btnText={btnText}
          actionResponse={confirmAction}
        />
      )}
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
                    onClick={() => removeUser(user.name, user.id)}
                  >
                    {isMobile ? <RiDeleteBin6Line /> : "Remove"}
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
