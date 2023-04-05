import api from "../../../utils/api";
import { useState, useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import Input from "../../form/Input";
import user_img from "../../../../src/profile_img_default.png";
import { UserContext } from "../../../context/UserContext";

function Profile() {
  const { deleteUserAccount } = useContext(UserContext);
  const [token] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    try {
      api
        .get("/user/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        <div className={styles.preview_image}>
          {(user.image || preview || user_img) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${user.image}`
              }
              alt="Profile img"
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <Input
          text="Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          value={user.name || ""}
          placeholder="Type user name"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          value={user.email || ""}
          autoComplete={"email"}
          placeholder="Type user email"
          readOnly={"readonly"}
        />
        <Input
          text="Role"
          type="text"
          name="role"
          value={user.role || ""}
          autoComplete={"role"}
          handleOnChange={handleChange}
          placeholder="Type user role"
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          value={user.phone || ""}
          placeholder="Type user phone number"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type temporary password"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type temporary password again"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Edit" />
        <button
          type="button"
          className={styles.btn2}
          onClick={deleteUserAccount}
        >
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
